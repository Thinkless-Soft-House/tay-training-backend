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
exports.TrainingDayService = void 0;
const common_1 = require("@nestjs/common");
const training_day_entity_1 = require("./entities/training-day.entity");
const typeorm_1 = require("@nestjs/typeorm");
const core_service_service_1 = require("../../core/utils/core-service.service");
const typeorm_2 = require("typeorm");
let TrainingDayService = class TrainingDayService extends core_service_service_1.CoreService {
    constructor(trainingDaysRepository) {
        super(trainingDaysRepository);
    }
    createWhere(query) {
        const where = {};
        if (query.day)
            where['day'] = query.day;
        if (query.trainingSheetId)
            where['trainingSheetId'] = query.trainingSheetId;
        if (query.exerciseGroupId)
            where['exerciseGroupId'] = query.exerciseGroupId;
        return where;
    }
    getTrainingDaysByTrainingSheetId(trainingSheetId) {
        return this.repository.find({
            where: { trainingSheetId },
        });
    }
};
TrainingDayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(training_day_entity_1.TrainingDay)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TrainingDayService);
exports.TrainingDayService = TrainingDayService;
//# sourceMappingURL=training-day.service.js.map