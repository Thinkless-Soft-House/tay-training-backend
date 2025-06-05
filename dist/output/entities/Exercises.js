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
exports.Exercises = void 0;
const typeorm_1 = require("typeorm");
const ExerciseConfigurations_1 = require("./ExerciseConfigurations");
let Exercises = class Exercises {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Exercises.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'name', length: 255 }),
    __metadata("design:type", String)
], Exercises.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'video_url',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Exercises.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'has_method', default: () => 'true' }),
    __metadata("design:type", Boolean)
], Exercises.prototype, "hasMethod", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Exercises.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Exercises.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'description', nullable: true }),
    __metadata("design:type", String)
], Exercises.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExerciseConfigurations_1.ExerciseConfigurations, (exerciseConfigurations) => exerciseConfigurations.exercise),
    __metadata("design:type", Array)
], Exercises.prototype, "exerciseConfigurations", void 0);
Exercises = __decorate([
    (0, typeorm_1.Entity)('exercises', { schema: 'public' })
], Exercises);
exports.Exercises = Exercises;
//# sourceMappingURL=Exercises.js.map