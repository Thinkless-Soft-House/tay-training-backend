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
exports.ExerciseGroupCategory = void 0;
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const exercise_group_entity_1 = require("../../exercise-groups/entities/exercise-group.entity");
const typeorm_1 = require("typeorm");
let ExerciseGroupCategory = class ExerciseGroupCategory extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseGroupCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_group_entity_1.ExerciseGroup, (exerciseGroup) => exerciseGroup.category, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], ExerciseGroupCategory.prototype, "exerciseGroups", void 0);
ExerciseGroupCategory = __decorate([
    (0, typeorm_1.Entity)({ name: 'exercise_group_categories' })
], ExerciseGroupCategory);
exports.ExerciseGroupCategory = ExerciseGroupCategory;
//# sourceMappingURL=exercise-group-category.entity.js.map