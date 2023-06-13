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
exports.ExerciseConfigurationsService = void 0;
const common_1 = require("@nestjs/common");
const exercise_configuration_entity_1 = require("./entities/exercise-configuration.entity");
const typeorm_1 = require("@nestjs/typeorm");
const core_service_service_1 = require("../../core/utils/core-service.service");
const typeorm_2 = require("typeorm");
const typeorm_utils_1 = require("../../core/functions/typeorm.utils");
let ExerciseConfigurationsService = class ExerciseConfigurationsService extends core_service_service_1.CoreService {
    constructor(methodsRepository) {
        super(methodsRepository);
    }
    createWhere(query) {
        const where = {};
        if (query.series)
            where['series'] = query.series;
        if (query.reps)
            where['reps'] = query.reps;
        if (query.rest)
            where['rest'] = query.rest;
        if (query.exerciseMethodId)
            where['exerciseMethodId'] = query.exerciseMethodId;
        if (query.exerciseId)
            where['exerciseId'] = query.exerciseId;
        if (query.methodId)
            where['methodId'] = query.methodId;
        return where;
    }
    getExerciseConfigurationsByExerciseMethodId(exerciseMethodId) {
        return this.repository.find({
            where: { exerciseMethodId },
        });
    }
    async updateListOfExerciseGroups(body) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const exMethodId = body[0].exerciseMethodId;
            const alreadyCreated = await this.getExerciseConfigurationsByExerciseMethodId(exMethodId);
            const newOnes = body.filter((ec) => !ec.id || !alreadyCreated.includes(ec));
            const deletedOnes = alreadyCreated.filter((ec) => !body.some((b) => b.id && b.id === ec.id));
            const updatedOnes = body.filter((ec) => ec.id && alreadyCreated.some((ac) => ac.id === ec.id));
            let n;
            let d;
            let u;
            if (newOnes.length > 0) {
                n = await this.createManyQueryRunner(queryRunner, newOnes);
            }
            console.log('newOnes', newOnes);
            if (deletedOnes.length > 0) {
                d = await this.deleteManyQueryRunner(queryRunner, deletedOnes);
            }
            console.log('deletedOnes', deletedOnes);
            if (updatedOnes.length > 0) {
                u = await this.updateManyQueryRunner(queryRunner, updatedOnes);
            }
            console.log('updatedOnes', updatedOnes);
            await new Promise((resolve) => setTimeout(resolve, 500));
            await queryRunner.commitTransaction();
            return { new: n, deleted: d, updated: u };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createManyQueryRunner(queryRunner, items) {
        try {
            const entities = items.map((item) => this.repository.create(item));
            const createdItems = await queryRunner.manager.save(entities);
            return createdItems.length;
        }
        catch (error) {
            console.log(error);
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async deleteManyQueryRunner(queryRunner, items) {
        try {
            const deletedIds = items.map((item) => item.id);
            const deleteResult = await queryRunner.manager.delete(this.repository.target, deletedIds);
            return deleteResult.affected;
        }
        catch (error) {
            console.log(error);
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async updateManyQueryRunner(queryRunner, items) {
        try {
            const updatedItems = await Promise.all(items.map(async (item) => {
                const entity = await this.repository.preload(item);
                if (entity) {
                    return queryRunner.manager.save(entity);
                }
            }));
            return updatedItems.filter((item) => item !== undefined).length;
        }
        catch (error) {
            console.log(error);
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
};
ExerciseConfigurationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_configuration_entity_1.ExerciseConfiguration)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExerciseConfigurationsService);
exports.ExerciseConfigurationsService = ExerciseConfigurationsService;
//# sourceMappingURL=exercise-configurations.service.js.map