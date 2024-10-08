"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass) {
        const userSearch = await this.usersService.findByFilter({
            email: username,
        });
        const user = userSearch.data[0];
        if (!user) {
            return { error: 'Usuário não encontrado' };
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        else {
            return { error: 'Senha incorreta' };
        }
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            id: user.id,
        };
    }
    async register(userDto) {
        const user = await this.usersService.findByFilter({ email: userDto.email });
        if (user.data.length > 0) {
            throw new common_1.BadRequestException('User already exists');
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(userDto.password, salt);
        const newUser = await this.usersService.create(Object.assign(Object.assign({}, userDto), { password: passwordHash }));
        return newUser;
    }
    hashPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(password, salt);
        return passwordHash;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map