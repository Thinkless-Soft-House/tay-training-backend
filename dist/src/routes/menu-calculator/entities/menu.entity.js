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
exports.Menu = exports.ExerciseStatus = void 0;
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const typeorm_1 = require("typeorm");
var ExerciseStatus;
(function (ExerciseStatus) {
    ExerciseStatus["ACTIVE"] = "active";
    ExerciseStatus["INACTIVE"] = "inactive";
})(ExerciseStatus = exports.ExerciseStatus || (exports.ExerciseStatus = {}));
let Menu = class Menu extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text' }),
    __metadata("design:type", String)
], Menu.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pdf_url', type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Menu.prototype, "pdfUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_calories', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Menu.prototype, "minCalories", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_calories', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Menu.prototype, "maxCalories", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: ExerciseStatus,
        default: ExerciseStatus.ACTIVE
    }),
    __metadata("design:type", String)
], Menu.prototype, "status", void 0);
Menu = __decorate([
    (0, typeorm_1.Entity)('menus')
], Menu);
exports.Menu = Menu;
//# sourceMappingURL=menu.entity.js.map