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
exports.ExerciseConfigurationsController = void 0;
const common_1 = require("@nestjs/common");
const exercise_configurations_service_1 = require("./exercise-configurations.service");
const core_controller_controller_1 = require("../../core/utils/core-controller.controller");
let ExerciseConfigurationsController = class ExerciseConfigurationsController extends core_controller_controller_1.CoreController {
    constructor(exerciseConfigurationsService) {
        super(exerciseConfigurationsService);
        this.exerciseConfigurationsService = exerciseConfigurationsService;
    }
    async updateListOfExerciseGroups(body) {
        const exMethodId = body[0].exerciseMethodId;
        const alreadyCreated = await this.exerciseConfigurationsService.getExerciseConfigurationsByExerciseMethodId(exMethodId);
        const newOnes = body.filter((ec) => !ec.id || !alreadyCreated.includes(ec));
        const deletedOnes = alreadyCreated.filter((ec) => !body
            .filter((b) => b.id)
            .map((b) => b.id)
            .includes(ec.id));
        const n = await this.createMany(newOnes);
        const d$ = deletedOnes.map((ec) => this.exerciseConfigurationsService.remove(ec.id));
        const d = await Promise.all(d$);
        return { new: n, deleted: d };
    }
};
__decorate([
    (0, common_1.Patch)('update-list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ExerciseConfigurationsController.prototype, "updateListOfExerciseGroups", null);
ExerciseConfigurationsController = __decorate([
    (0, common_1.Controller)('exercise-configurations'),
    __metadata("design:paramtypes", [exercise_configurations_service_1.ExerciseConfigurationsService])
], ExerciseConfigurationsController);
exports.ExerciseConfigurationsController = ExerciseConfigurationsController;
//# sourceMappingURL=exercise-configurations.controller.js.map