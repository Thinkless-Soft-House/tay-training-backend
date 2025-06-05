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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Methods = void 0;
const typeorm_1 = require("typeorm");
const ExerciseConfigurations_1 = require("./ExerciseConfigurations");
let Methods = class Methods {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Methods.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Methods.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Methods.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Methods.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'description' }),
    __metadata("design:type", String)
], Methods.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExerciseConfigurations_1.ExerciseConfigurations, (exerciseConfigurations) => exerciseConfigurations.method),
    __metadata("design:type", Array)
], Methods.prototype, "exerciseConfigurations", void 0);
Methods = __decorate([
    (0, typeorm_1.Entity)('methods', { schema: 'public' })
], Methods);
exports.Methods = Methods;
//# sourceMappingURL=Methods.js.map