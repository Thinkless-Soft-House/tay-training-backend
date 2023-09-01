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
exports.ExerciseGroups = void 0;
const typeorm_1 = require("typeorm");
const ExerciseGroupCategories_1 = require("./ExerciseGroupCategories");
const ExerciseMethods_1 = require("./ExerciseMethods");
const TrainingDays_1 = require("./TrainingDays");
let ExerciseGroups = class ExerciseGroups {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], ExerciseGroups.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseGroups.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseGroups.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], ExerciseGroups.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'publicName',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], ExerciseGroups.prototype, "publicName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExerciseGroupCategories_1.ExerciseGroupCategories, (exerciseGroupCategories) => exerciseGroupCategories.exerciseGroups),
    (0, typeorm_1.JoinColumn)([{ name: 'category_id', referencedColumnName: 'id' }]),
    __metadata("design:type", ExerciseGroupCategories_1.ExerciseGroupCategories)
], ExerciseGroups.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExerciseMethods_1.ExerciseMethods, (exerciseMethods) => exerciseMethods.exerciseGroup),
    __metadata("design:type", Array)
], ExerciseGroups.prototype, "exerciseMethods", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TrainingDays_1.TrainingDays, (trainingDays) => trainingDays.exerciseGroup),
    __metadata("design:type", Array)
], ExerciseGroups.prototype, "trainingDays", void 0);
ExerciseGroups = __decorate([
    (0, typeorm_1.Entity)('exercise_groups', { schema: 'public' })
], ExerciseGroups);
exports.ExerciseGroups = ExerciseGroups;
//# sourceMappingURL=ExerciseGroups.js.map