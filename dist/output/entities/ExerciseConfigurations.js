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
exports.ExerciseConfigurations = void 0;
const typeorm_1 = require("typeorm");
const Exercises_1 = require("./Exercises");
const ExerciseMethods_1 = require("./ExerciseMethods");
const Methods_1 = require("./Methods");
let ExerciseConfigurations = class ExerciseConfigurations {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], ExerciseConfigurations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseConfigurations.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseConfigurations.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'series', length: 255 }),
    __metadata("design:type", String)
], ExerciseConfigurations.prototype, "series", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'repetitions', length: 255 }),
    __metadata("design:type", String)
], ExerciseConfigurations.prototype, "repetitions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Exercises_1.Exercises, (exercises) => exercises.exerciseConfigurations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'exercise_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Exercises_1.Exercises)
], ExerciseConfigurations.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExerciseMethods_1.ExerciseMethods, (exerciseMethods) => exerciseMethods.exerciseConfigurations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'exercise_method_id', referencedColumnName: 'id' }]),
    __metadata("design:type", ExerciseMethods_1.ExerciseMethods)
], ExerciseConfigurations.prototype, "exerciseMethod", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Methods_1.Methods, (methods) => methods.exerciseConfigurations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'method_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Methods_1.Methods)
], ExerciseConfigurations.prototype, "method", void 0);
ExerciseConfigurations = __decorate([
    (0, typeorm_1.Entity)('exercise_configurations', { schema: 'public' })
], ExerciseConfigurations);
exports.ExerciseConfigurations = ExerciseConfigurations;
//# sourceMappingURL=ExerciseConfigurations.js.map