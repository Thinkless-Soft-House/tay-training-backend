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
exports.ExerciseGroup = void 0;
const exercise_group_category_entity_1 = require("../../exercise-group-categories/entities/exercise-group-category.entity");
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const exercise_method_entity_1 = require("../../exercise-method/entities/exercise-method.entity");
const training_day_entity_1 = require("../../training-day/entities/training-day.entity");
const typeorm_1 = require("typeorm");
let ExerciseGroup = class ExerciseGroup extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', type: 'text' }),
    __metadata("design:type", String)
], ExerciseGroup.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ExerciseGroup.prototype, "publicName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_group_category_entity_1.ExerciseGroupCategory, (exerciseGroupCategory) => exerciseGroupCategory.exerciseGroups, {}),
    (0, typeorm_1.JoinColumn)({ name: 'category_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ExerciseGroup.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_method_entity_1.ExerciseMethod, (exerciseMethod) => exerciseMethod.exerciseGroup, {}),
    __metadata("design:type", Object)
], ExerciseGroup.prototype, "exerciseMethods", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => training_day_entity_1.TrainingDay, (trainingDay) => trainingDay.exerciseGroup, {}),
    __metadata("design:type", Object)
], ExerciseGroup.prototype, "trainingDays", void 0);
ExerciseGroup = __decorate([
    (0, typeorm_1.Entity)({ name: 'exercise_groups' })
], ExerciseGroup);
exports.ExerciseGroup = ExerciseGroup;
//# sourceMappingURL=exercise-group.entity.js.map