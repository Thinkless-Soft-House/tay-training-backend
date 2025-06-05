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
exports.ExerciseMethod = void 0;
const exercise_configuration_entity_1 = require("./../../exercise-configurations/entities/exercise-configuration.entity");
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const exercise_group_entity_1 = require("../../exercise-groups/entities/exercise-group.entity");
const typeorm_1 = require("typeorm");
let ExerciseMethod = class ExerciseMethod extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseMethod.prototype, "rest", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ExerciseMethod.prototype, "observations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ExerciseMethod.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exercise_group_id', type: 'int' }),
    __metadata("design:type", Number)
], ExerciseMethod.prototype, "exerciseGroupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_group_entity_1.ExerciseGroup, (exerciseGroup) => exerciseGroup.exerciseMethods, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_group_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ExerciseMethod.prototype, "exerciseGroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_configuration_entity_1.ExerciseConfiguration, (exerciseConfiguration) => exerciseConfiguration.exerciseMethod, {}),
    __metadata("design:type", Object)
], ExerciseMethod.prototype, "exerciseConfigurations", void 0);
ExerciseMethod = __decorate([
    (0, typeorm_1.Entity)({ name: 'exercise_methods' })
], ExerciseMethod);
exports.ExerciseMethod = ExerciseMethod;
//# sourceMappingURL=exercise-method.entity.js.map