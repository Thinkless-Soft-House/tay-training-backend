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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseMethodController = void 0;
const common_1 = require("@nestjs/common");
const exercise_method_service_1 = require("./exercise-method.service");
const core_controller_controller_1 = require("../../core/utils/core-controller.controller");
let ExerciseMethodController = class ExerciseMethodController extends core_controller_controller_1.CoreController {
    constructor(exerciseMethodService) {
        super(exerciseMethodService);
        this.exerciseMethodService = exerciseMethodService;
    }
    clearByExerciseGroupId(data) {
        return this.exerciseMethodService.clearByExerciseGroupId(data.exerciseGroupId);
    }
};
__decorate([
    (0, common_1.Post)('/clear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExerciseMethodController.prototype, "clearByExerciseGroupId", null);
ExerciseMethodController = __decorate([
    (0, common_1.Controller)('exercise-method'),
    __metadata("design:paramtypes", [exercise_method_service_1.ExerciseMethodService])
], ExerciseMethodController);
exports.ExerciseMethodController = ExerciseMethodController;
//# sourceMappingURL=exercise-method.controller.js.map