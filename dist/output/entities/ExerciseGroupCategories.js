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
exports.ExerciseGroupCategories = void 0;
const typeorm_1 = require("typeorm");
const ExerciseGroups_1 = require("./ExerciseGroups");
let ExerciseGroupCategories = class ExerciseGroupCategories {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], ExerciseGroupCategories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseGroupCategories.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseGroupCategories.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], ExerciseGroupCategories.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExerciseGroups_1.ExerciseGroups, (exerciseGroups) => exerciseGroups.category),
    __metadata("design:type", Array)
], ExerciseGroupCategories.prototype, "exerciseGroups", void 0);
ExerciseGroupCategories = __decorate([
    (0, typeorm_1.Entity)('exercise_group_categories', { schema: 'public' })
], ExerciseGroupCategories);
exports.ExerciseGroupCategories = ExerciseGroupCategories;
//# sourceMappingURL=ExerciseGroupCategories.js.map