"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingDayModule = void 0;
const common_1 = require("@nestjs/common");
const training_day_service_1 = require("./training-day.service");
const training_day_controller_1 = require("./training-day.controller");
const typeorm_1 = require("@nestjs/typeorm");
const training_day_entity_1 = require("./entities/training-day.entity");
let TrainingDayModule = class TrainingDayModule {
};
TrainingDayModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([training_day_entity_1.TrainingDay])],
        controllers: [training_day_controller_1.TrainingDayController],
        providers: [training_day_service_1.TrainingDayService],
    })
], TrainingDayModule);
exports.TrainingDayModule = TrainingDayModule;
//# sourceMappingURL=training-day.module.js.map