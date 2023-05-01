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
exports.TrainingSheet = void 0;
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const training_day_entity_1 = require("../../training-day/entities/training-day.entity");
const typeorm_1 = require("typeorm");
let TrainingSheet = class TrainingSheet extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TrainingSheet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => training_day_entity_1.TrainingDay, (trainingDay) => trainingDay.trainingSheet, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], TrainingSheet.prototype, "trainingDays", void 0);
TrainingSheet = __decorate([
    (0, typeorm_1.Entity)({ name: 'training_sheets' })
], TrainingSheet);
exports.TrainingSheet = TrainingSheet;
//# sourceMappingURL=training-sheet.entity.js.map