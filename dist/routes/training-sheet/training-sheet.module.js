"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingSheetModule = void 0;
const common_1 = require("@nestjs/common");
const training_sheet_service_1 = require("./training-sheet.service");
const training_sheet_controller_1 = require("./training-sheet.controller");
const typeorm_1 = require("@nestjs/typeorm");
const training_sheet_entity_1 = require("./entities/training-sheet.entity");
let TrainingSheetModule = class TrainingSheetModule {
};
TrainingSheetModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([training_sheet_entity_1.TrainingSheet])],
        controllers: [training_sheet_controller_1.TrainingSheetController],
        providers: [training_sheet_service_1.TrainingSheetService],
    })
], TrainingSheetModule);
exports.TrainingSheetModule = TrainingSheetModule;
//# sourceMappingURL=training-sheet.module.js.map