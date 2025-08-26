"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingAccessModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const training_access_entity_1 = require("./entities/training-access.entity");
const training_access_service_1 = require("./training-access.service");
const training_access_controller_1 = require("./training-access.controller");
let TrainingAccessModule = class TrainingAccessModule {
};
TrainingAccessModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([training_access_entity_1.TrainingAccess])],
        providers: [training_access_service_1.TrainingAccessService],
        controllers: [training_access_controller_1.TrainingAccessController],
    })
], TrainingAccessModule);
exports.TrainingAccessModule = TrainingAccessModule;
//# sourceMappingURL=training-access.module.js.map