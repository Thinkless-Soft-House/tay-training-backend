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
exports.ExerciseMethodService = void 0;
const common_1 = require("@nestjs/common");
const core_service_service_1 = require("../../core/utils/core-service.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exercise_method_entity_1 = require("./entities/exercise-method.entity");
const error_handler_1 = require("../../core/handlers/error.handler");
const typeorm_utils_1 = require("../../core/functions/typeorm.utils");
let ExerciseMethodService = class ExerciseMethodService extends core_service_service_1.CoreService {
    constructor(exerciseGroupRepository) {
        super(exerciseGroupRepository);
    }
    createWhere(query) {
        const where = {};
        if (query.type)
            where['type'] = (0, typeorm_2.ILike)(`%${query.type}%`);
        if (query.exerciseGroupId)
            where['exerciseGroupId'] = query.exerciseGroupId;
        return where;
    }
    async clearByExerciseGroupId(exerciseGroupId) {
        try {
            const whereId = { exerciseGroupId };
            const item = await this.repository.find({
                where: whereId,
            });
            if (!item) {
                throw new error_handler_1.ErrorHandler('Item não encontrado', 404, 404);
            }
            await this.repository.delete({ exerciseGroupId });
            return item;
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
};
ExerciseMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_method_entity_1.ExerciseMethod)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExerciseMethodService);
exports.ExerciseMethodService = ExerciseMethodService;
//# sourceMappingURL=exercise-method.service.js.map