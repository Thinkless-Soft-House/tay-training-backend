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
exports.TrainingSheetController = void 0;
const common_1 = require("@nestjs/common");
const training_sheet_service_1 = require("./training-sheet.service");
const core_controller_controller_1 = require("../../core/utils/core-controller.controller");
let TrainingSheetController = class TrainingSheetController extends core_controller_controller_1.CoreController {
    constructor(trainingSheetService) {
        super(trainingSheetService);
        this.trainingSheetService = trainingSheetService;
    }
};
TrainingSheetController = __decorate([
    (0, common_1.Controller)('training-sheet'),
    __metadata("design:paramtypes", [training_sheet_service_1.TrainingSheetService])
], TrainingSheetController);
exports.TrainingSheetController = TrainingSheetController;
//# sourceMappingURL=training-sheet.controller.js.map