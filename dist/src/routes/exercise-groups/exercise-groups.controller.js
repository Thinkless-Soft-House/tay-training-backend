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
exports.ExerciseGroupsController = void 0;
const common_1 = require("@nestjs/common");
const exercise_groups_service_1 = require("./exercise-groups.service");
const core_controller_controller_1 = require("../../core/utils/core-controller.controller");
let ExerciseGroupsController = class ExerciseGroupsController extends core_controller_controller_1.CoreController {
    constructor(exerciseGroupsService) {
        super(exerciseGroupsService);
        this.exerciseGroupsService = exerciseGroupsService;
    }
};
ExerciseGroupsController = __decorate([
    (0, common_1.Controller)('exercise-groups'),
    __metadata("design:paramtypes", [exercise_groups_service_1.ExerciseGroupsService])
], ExerciseGroupsController);
exports.ExerciseGroupsController = ExerciseGroupsController;
//# sourceMappingURL=exercise-groups.controller.js.map