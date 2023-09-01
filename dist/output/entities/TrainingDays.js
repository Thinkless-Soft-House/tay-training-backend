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
exports.TrainingDays = void 0;
const typeorm_1 = require("typeorm");
const ExerciseGroups_1 = require("./ExerciseGroups");
const TrainingSheets_1 = require("./TrainingSheets");
let TrainingDays = class TrainingDays {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], TrainingDays.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], TrainingDays.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], TrainingDays.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'day' }),
    __metadata("design:type", Number)
], TrainingDays.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExerciseGroups_1.ExerciseGroups, (exerciseGroups) => exerciseGroups.trainingDays, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'exercise_group_id', referencedColumnName: 'id' }]),
    __metadata("design:type", ExerciseGroups_1.ExerciseGroups)
], TrainingDays.prototype, "exerciseGroup", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TrainingSheets_1.TrainingSheets, (trainingSheets) => trainingSheets.trainingDays, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'training_sheet_id', referencedColumnName: 'id' }]),
    __metadata("design:type", TrainingSheets_1.TrainingSheets)
], TrainingDays.prototype, "trainingSheet", void 0);
TrainingDays = __decorate([
    (0, typeorm_1.Entity)('training_days', { schema: 'public' })
], TrainingDays);
exports.TrainingDays = TrainingDays;
//# sourceMappingURL=TrainingDays.js.map