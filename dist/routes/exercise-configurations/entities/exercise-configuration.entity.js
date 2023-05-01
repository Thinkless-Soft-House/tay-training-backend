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
exports.ExerciseConfiguration = void 0;
const CoreEntity_model_1 = require("../../../core/models/CoreEntity.model");
const exercise_method_entity_1 = require("../../exercise-method/entities/exercise-method.entity");
const exercise_entity_1 = require("../../exercises/entities/exercise.entity");
const method_entity_1 = require("../../methods/entities/method.entity");
const typeorm_1 = require("typeorm");
let ExerciseConfiguration = class ExerciseConfiguration extends CoreEntity_model_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseConfiguration.prototype, "series", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repetitions', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseConfiguration.prototype, "reps", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseConfiguration.prototype, "rest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exercise_method_id' }),
    __metadata("design:type", Number)
], ExerciseConfiguration.prototype, "exerciseMethodId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exercise_id' }),
    __metadata("design:type", Number)
], ExerciseConfiguration.prototype, "exerciseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'method_id' }),
    __metadata("design:type", Number)
], ExerciseConfiguration.prototype, "methodId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_method_entity_1.ExerciseMethod, (exerciseMethod) => exerciseMethod.exerciseConfigurations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_method_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ExerciseConfiguration.prototype, "exerciseMethod", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_entity_1.Exercise, (exerciseMethod) => exerciseMethod.exerciseConfigurations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ExerciseConfiguration.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => method_entity_1.Method, (exerciseMethod) => exerciseMethod.exerciseConfigurations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'method_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ExerciseConfiguration.prototype, "method", void 0);
ExerciseConfiguration = __decorate([
    (0, typeorm_1.Entity)({ name: 'exercise_configurations' })
], ExerciseConfiguration);
exports.ExerciseConfiguration = ExerciseConfiguration;
//# sourceMappingURL=exercise-configuration.entity.js.map