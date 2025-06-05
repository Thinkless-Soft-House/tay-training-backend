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
exports.TrainingDayController = void 0;
const common_1 = require("@nestjs/common");
const training_day_service_1 = require("./training-day.service");
const core_controller_controller_1 = require("../../core/utils/core-controller.controller");
let TrainingDayController = class TrainingDayController extends core_controller_controller_1.CoreController {
    constructor(trainingDayService) {
        super(trainingDayService);
        this.trainingDayService = trainingDayService;
    }
    async updateListOfExerciseGroups(body) {
        const tSheetId = body[0].trainingSheetId;
        const alreadyCreated = await this.trainingDayService.getTrainingDaysByTrainingSheetId(tSheetId);
        const newOnes = body.filter((ec) => !ec.id || !alreadyCreated.includes(ec));
        const deletedOnes = alreadyCreated.filter((ec) => !body
            .filter((b) => b.id)
            .map((b) => b.id)
            .includes(ec.id));
        const n = await this.createMany(newOnes);
        const d$ = deletedOnes.map((ec) => this.trainingDayService.remove(ec.id));
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
], TrainingDayController.prototype, "updateListOfExerciseGroups", null);
TrainingDayController = __decorate([
    (0, common_1.Controller)('training-day'),
    __metadata("design:paramtypes", [training_day_service_1.TrainingDayService])
], TrainingDayController);
exports.TrainingDayController = TrainingDayController;
//# sourceMappingURL=training-day.controller.js.map