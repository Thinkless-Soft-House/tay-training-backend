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
exports.ExerciseMethods = void 0;
const typeorm_1 = require("typeorm");
const ExerciseConfigurations_1 = require("./ExerciseConfigurations");
const ExerciseGroups_1 = require("./ExerciseGroups");
let ExerciseMethods = class ExerciseMethods {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], ExerciseMethods.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseMethods.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], ExerciseMethods.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'rest', length: 255 }),
    __metadata("design:type", String)
], ExerciseMethods.prototype, "rest", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'observations', nullable: true }),
    __metadata("design:type", String)
], ExerciseMethods.prototype, "observations", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'order', nullable: true }),
    __metadata("design:type", Number)
], ExerciseMethods.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExerciseConfigurations_1.ExerciseConfigurations, (exerciseConfigurations) => exerciseConfigurations.exerciseMethod),
    __metadata("design:type", Array)
], ExerciseMethods.prototype, "exerciseConfigurations", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExerciseGroups_1.ExerciseGroups, (exerciseGroups) => exerciseGroups.exerciseMethods, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'exercise_group_id', referencedColumnName: 'id' }]),
    __metadata("design:type", ExerciseGroups_1.ExerciseGroups)
], ExerciseMethods.prototype, "exerciseGroup", void 0);
ExerciseMethods = __decorate([
    (0, typeorm_1.Entity)('exercise_methods', { schema: 'public' })
], ExerciseMethods);
exports.ExerciseMethods = ExerciseMethods;
//# sourceMappingURL=ExerciseMethods.js.map