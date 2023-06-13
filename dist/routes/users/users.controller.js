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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const core_controller_controller_1 = require("../../core/utils/core-controller.controller");
const error_handler_1 = require("../../core/handlers/error.handler");
const bcryptjs_1 = require("bcryptjs");
let UsersController = class UsersController extends core_controller_controller_1.CoreController {
    constructor(UserService) {
        super(UserService);
        this.UserService = UserService;
    }
    async create(createDto) {
        var _a, _b;
        try {
            const encryptedPassword = (0, bcryptjs_1.hashSync)(createDto.password, 10);
            const newUser = Object.assign(Object.assign({}, createDto), { password: encryptedPassword });
            const create$ = await this.service.create(newUser);
            return create$;
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map