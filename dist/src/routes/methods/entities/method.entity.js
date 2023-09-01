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
exports.Method = void 0;
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const exercise_configuration_entity_1 = require("../../exercise-configurations/entities/exercise-configuration.entity");
const typeorm_1 = require("typeorm");
let Method = class Method extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Method.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text' }),
    __metadata("design:type", String)
], Method.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_configuration_entity_1.ExerciseConfiguration, (exerciseConfiguration) => exerciseConfiguration.method, {}),
    __metadata("design:type", Object)
], Method.prototype, "exerciseConfigurations", void 0);
Method = __decorate([
    (0, typeorm_1.Entity)('methods')
], Method);
exports.Method = Method;
//# sourceMappingURL=method.entity.js.map