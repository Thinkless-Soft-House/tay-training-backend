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
exports.TrainingAccessController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../routes/auth/jwt-auth.guard");
const training_access_service_1 = require("./training-access.service");
const create_training_access_dto_1 = require("./dto/create-training-access.dto");
let TrainingAccessController = class TrainingAccessController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return await this.service.create(dto.clientId, dto.trainingId);
    }
    async top5() {
        return await this.service.top5Today();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_training_access_dto_1.CreateTrainingAccessDto]),
    __metadata("design:returntype", Promise)
], TrainingAccessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('top5-today'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingAccessController.prototype, "top5", null);
TrainingAccessController = __decorate([
    (0, common_1.Controller)('training-access'),
    (0, jwt_auth_guard_1.Public)(),
    __metadata("design:paramtypes", [training_access_service_1.TrainingAccessService])
], TrainingAccessController);
exports.TrainingAccessController = TrainingAccessController;
//# sourceMappingURL=training-access.controller.js.map