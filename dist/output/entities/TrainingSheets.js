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
exports.TrainingSheets = void 0;
const typeorm_1 = require("typeorm");
const TrainingDays_1 = require("./TrainingDays");
let TrainingSheets = class TrainingSheets {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], TrainingSheets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], TrainingSheets.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], TrainingSheets.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], TrainingSheets.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'publicName',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], TrainingSheets.prototype, "publicName", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'slug', nullable: true, length: 255 }),
    __metadata("design:type", String)
], TrainingSheets.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'offlinePdf',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], TrainingSheets.prototype, "offlinePdf", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'newTabPdf',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], TrainingSheets.prototype, "newTabPdf", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'pdfPath', nullable: true, length: 255 }),
    __metadata("design:type", String)
], TrainingSheets.prototype, "pdfPath", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TrainingDays_1.TrainingDays, (trainingDays) => trainingDays.trainingSheet),
    __metadata("design:type", Array)
], TrainingSheets.prototype, "trainingDays", void 0);
TrainingSheets = __decorate([
    (0, typeorm_1.Entity)('training_sheets', { schema: 'public' })
], TrainingSheets);
exports.TrainingSheets = TrainingSheets;
//# sourceMappingURL=TrainingSheets.js.map