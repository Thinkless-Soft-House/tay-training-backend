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
exports.TrainingDay = void 0;
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const exercise_group_entity_1 = require("../../exercise-groups/entities/exercise-group.entity");
const training_sheet_entity_1 = require("../../training-sheet/entities/training-sheet.entity");
const typeorm_1 = require("typeorm");
let TrainingDay = class TrainingDay extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'day' }),
    __metadata("design:type", Number)
], TrainingDay.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'training_sheet_id' }),
    __metadata("design:type", Number)
], TrainingDay.prototype, "trainingSheetId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exercise_group_id' }),
    __metadata("design:type", Number)
], TrainingDay.prototype, "exerciseGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'short_name', nullable: true }),
    __metadata("design:type", String)
], TrainingDay.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => training_sheet_entity_1.TrainingSheet, (trainingSheet) => trainingSheet.trainingDays, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'training_sheet_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], TrainingDay.prototype, "trainingSheet", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_group_entity_1.ExerciseGroup, (exerciseGroup) => exerciseGroup.trainingDays, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_group_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], TrainingDay.prototype, "exerciseGroup", void 0);
TrainingDay = __decorate([
    (0, typeorm_1.Entity)({ name: 'training_days' })
], TrainingDay);
exports.TrainingDay = TrainingDay;
//# sourceMappingURL=training-day.entity.js.map