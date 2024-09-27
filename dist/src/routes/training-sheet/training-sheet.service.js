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
exports.TrainingSheetService = void 0;
const common_1 = require("@nestjs/common");
const training_sheet_entity_1 = require("./entities/training-sheet.entity");
const typeorm_1 = require("@nestjs/typeorm");
const core_service_service_1 = require("../../core/utils/core-service.service");
const typeorm_2 = require("typeorm");
const slugify_1 = require("slugify");
const typeorm_utils_1 = require("../../core/functions/typeorm.utils");
const File_service_1 = require("../../core/services/File.service");
const error_handler_1 = require("../../core/handlers/error.handler");
let TrainingSheetService = class TrainingSheetService extends core_service_service_1.CoreService {
    constructor(trainingSheetRepository, fileService) {
        super(trainingSheetRepository);
        this.fileService = fileService;
    }
    async getFile(id) {
        const whereId = { id };
        const item = await this.repository.findOne({
            where: whereId,
        });
        if (!item) {
            throw new error_handler_1.ErrorHandler('Item não encontrado', 404, 404);
        }
        const fileConfig = {
            filename: 'Treino_' + id + '.pdf',
            path: './files/workouts/',
        };
        const buffer = await this.fileService.getFile(fileConfig.path, fileConfig.filename);
        return buffer;
    }
    createWhere(query) {
        const where = {};
        if (query.name)
            where['name'] = (0, typeorm_2.ILike)(`%${query.name}%`);
        if (query.publicName)
            where['publicName'] = (0, typeorm_2.ILike)(`%${query.publicName}%`);
        if (query.slug)
            where['slug'] = `${query.slug}`;
        return where;
    }
    async create(createDto) {
        try {
            const data = Object.assign(Object.assign({}, createDto), { slug: (0, slugify_1.default)(createDto.name, { lower: true }) });
            const newItem = this.repository.create(data);
            const create$ = await this.repository.save(newItem);
            const slug = (0, slugify_1.default)(`${create$.id}-${create$.name}`, {
                lower: true,
            });
            await this.repository.update(create$.id, {
                slug,
            });
            return Object.assign(Object.assign({}, create$), { slug });
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async createWithFile(createDto, file) {
        try {
            const data = Object.assign(Object.assign({}, createDto), { slug: (0, slugify_1.default)(createDto.name, { lower: true }) });
            const newItem = this.repository.create(data);
            const create$ = await this.repository.save(newItem);
            const slug = (0, slugify_1.default)(`${create$.id}-${create$.name}`, {
                lower: true,
            });
            const toUpdate = {
                slug,
                pdfPath: null,
            };
            if (file) {
                const fileConfig = {
                    filename: 'Treino_' + create$.id + '.pdf',
                    path: './files/workouts/',
                };
                await this.fileService.createFile(fileConfig.path, fileConfig.filename, file);
                toUpdate.pdfPath = fileConfig.path;
            }
            await this.repository.update(create$.id, toUpdate);
            return Object.assign(Object.assign({}, create$), { slug });
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async updateWithFile(id, updateDto, file) {
        try {
            const whereId = { id };
            const item = await this.repository.findOne({
                where: whereId,
            });
            if (!item) {
                throw new error_handler_1.ErrorHandler('Item não encontrado', 404, 404);
            }
            if (file) {
                const fileConfig = {
                    filename: 'Treino_' + id + '.pdf',
                    path: './files/workouts/',
                };
                await this.fileService.createFile(fileConfig.path, fileConfig.filename, file);
                updateDto.pdfPath = fileConfig.path;
            }
            const dto = Object.assign({ id }, updateDto);
            const newItem = this.repository.create(dto);
            await this.repository.update(id, newItem);
            return await this.repository.findOne({ where: whereId });
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async getPlannerHomeData(slug) {
        const query = this.repository
            .createQueryBuilder('trainingSheet')
            .leftJoinAndSelect('trainingSheet.trainingDays', 'trainingDays')
            .select([
            'trainingSheet.id',
            'trainingSheet.publicName',
            'trainingSheet.slug',
            'trainingSheet.pdfPath',
            'trainingDays.id',
            'trainingDays.day',
        ])
            .where('trainingSheet.slug = :slug', { slug });
        return await query.getOne();
    }
    async getWeekData(slug, weekNumber) {
        const startDay = weekNumber * 7 - 6;
        const endDay = weekNumber * 7;
        const query = this.repository
            .createQueryBuilder('workout')
            .leftJoinAndSelect('workout.trainingDays', 'trainingDays', 'trainingDays.day BETWEEN :startDay AND :endDay', { startDay, endDay })
            .leftJoinAndSelect('trainingDays.exerciseGroup', 'exerciseGroup')
            .leftJoinAndSelect('exerciseGroup.category', 'category')
            .select([
            'workout.publicName',
            'trainingDays.day',
            'trainingDays.shortName',
            'exerciseGroup.publicName',
        ])
            .where('workout.slug = :slug', { slug });
        const planner = await query.getOne();
        const weekDays = [];
        for (let i = startDay + 1; i <= endDay; i++) {
            const day = planner === null || planner === void 0 ? void 0 : planner.trainingDays.find((td) => td.day === i);
            if (day) {
                weekDays.push({
                    day: day.day,
                    shortName: day.shortName,
                    exerciseGroup: day.exerciseGroup
                        ? { publicName: day.exerciseGroup.publicName }
                        : null,
                });
            }
            else {
                weekDays.push(null);
            }
        }
        return {
            id: planner === null || planner === void 0 ? void 0 : planner.id,
            publicName: planner === null || planner === void 0 ? void 0 : planner.publicName,
            slug: planner === null || planner === void 0 ? void 0 : planner.slug,
            weekDays,
        };
    }
    async getWorkoutDetail(slug, week, workoutIndex) {
        const startDay = week * 7 - 6;
        const endDay = week * 7;
        const dayNumber = startDay + workoutIndex;
        const query = this.repository
            .createQueryBuilder('trainingSheet')
            .leftJoinAndSelect('trainingSheet.trainingDays', 'trainingDay', 'trainingDay.day = :dayNumber', { dayNumber })
            .leftJoinAndSelect('trainingDay.exerciseGroup', 'exerciseGroup')
            .leftJoinAndSelect('exerciseGroup.exerciseMethods', 'exerciseMethod')
            .leftJoinAndSelect('exerciseMethod.exerciseConfigurations', 'exerciseConfiguration')
            .leftJoinAndSelect('exerciseConfiguration.exercise', 'exercise')
            .leftJoinAndSelect('exerciseConfiguration.method', 'method')
            .select([
            'trainingSheet.publicName',
            'exerciseGroup.publicName',
            'exerciseMethod.rest',
            'exerciseMethod.observations',
            'exerciseConfiguration.id',
            'exerciseConfiguration.series',
            'exerciseConfiguration.reps',
            'exercise.name',
            'exercise.videoUrl',
            'method.name',
            'trainingSheet.id',
            'trainingDay.id',
            'exerciseGroup.id',
            'exerciseMethod.id',
            'exercise.id',
            'method.id',
        ])
            .where('trainingSheet.slug = :slug', { slug });
        const trainingSheet = await query.getOne();
        if (!trainingSheet) {
            throw new common_1.NotFoundException('Treino não encontrado');
        }
        const trainingDay = trainingSheet.trainingDays[0];
        if (!trainingDay) {
            throw new common_1.NotFoundException('Dia de treino não encontrado');
        }
        const exerciseGroup = trainingDay.exerciseGroup;
        if (!exerciseGroup) {
            throw new common_1.NotFoundException('Grupo de exercícios não encontrado');
        }
        return {
            id: trainingSheet.id,
            publicName: trainingSheet.publicName,
            slug: trainingSheet.slug,
            workout: {
                id: exerciseGroup.id,
                publicName: exerciseGroup.publicName,
                observations: exerciseGroup.observations || '',
                exerciseMethods: exerciseGroup.exerciseMethods,
            },
        };
    }
};
TrainingSheetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(training_sheet_entity_1.TrainingSheet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        File_service_1.FileService])
], TrainingSheetService);
exports.TrainingSheetService = TrainingSheetService;
//# sourceMappingURL=training-sheet.service.js.map