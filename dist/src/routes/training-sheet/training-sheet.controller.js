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
exports.TrainingSheetController = void 0;
const common_1 = require("@nestjs/common");
const training_sheet_service_1 = require("./training-sheet.service");
const core_controller_controller_1 = require("../../core/utils/core-controller.controller");
const error_handler_1 = require("../../core/handlers/error.handler");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_interceptor_1 = require("../../core/inteceptors/cache.interceptor");
let TrainingSheetController = class TrainingSheetController extends core_controller_controller_1.CoreController {
    constructor(trainingSheetService) {
        super(trainingSheetService);
        this.trainingSheetService = trainingSheetService;
    }
    async createWithFile(createDto, file) {
        var _a, _b;
        try {
            let create$;
            if (file && !!file.file) {
                create$ = await this.service.createWithFile(Object.assign(Object.assign({}, createDto), { trainingDays: JSON.parse(createDto.trainingDays) }), file.file[0].buffer);
            }
            else {
                create$ = await this.service.create(Object.assign(Object.assign({}, createDto), { trainingDays: JSON.parse(createDto.trainingDays) }));
            }
            return create$;
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async updateWithFile(id, updateDto, file) {
        var _a, _b;
        try {
            let update$;
            if (file && file.file) {
                update$ = await this.service.updateWithFile(+id, updateDto, file.file[0].buffer);
            }
            else {
                update$ = await this.service.update(+id, updateDto);
            }
            return update$;
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async getFile(id, res) {
        var _a, _b;
        try {
            const file = await this.service.getFile(+id);
            res.set('Content-Type', 'application/pdf');
            res.send(file);
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async getPlannerHome(slug) {
        return await this.service.getPlannerHomeData(slug);
    }
    async getWeekData(slug, week) {
        const weekNumber = parseInt(week, 10);
        if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 4) {
            throw new common_1.NotFoundException('Semana inválida');
        }
        return await this.service.getWeekData(slug, weekNumber);
    }
    async getWorkoutDetail(slug, week, workoutIndex) {
        if (isNaN(week) || week < 1 || week > 4) {
            throw new common_1.NotFoundException('Semana inválida');
        }
        return await this.service.getWorkoutDetail(slug, week, workoutIndex);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file', maxCount: 1 }])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TrainingSheetController.prototype, "createWithFile", null);
__decorate([
    (0, common_1.Patch)('single/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file', maxCount: 1 }])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TrainingSheetController.prototype, "updateWithFile", null);
__decorate([
    (0, common_1.Get)('file/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrainingSheetController.prototype, "getFile", null);
__decorate([
    (0, jwt_auth_guard_1.Public)(),
    (0, common_1.UseInterceptors)(cache_interceptor_1.CustomCacheInterceptor),
    (0, cache_manager_1.CacheTTL)(10 * 60 * 1000),
    (0, common_1.Get)('planner-home/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingSheetController.prototype, "getPlannerHome", null);
__decorate([
    (0, jwt_auth_guard_1.Public)(),
    (0, common_1.UseInterceptors)(cache_interceptor_1.CustomCacheInterceptor),
    (0, cache_manager_1.CacheTTL)(10 * 60 * 1000),
    (0, common_1.Get)('week/:slug/:week'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('week')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrainingSheetController.prototype, "getWeekData", null);
__decorate([
    (0, jwt_auth_guard_1.Public)(),
    (0, common_1.UseInterceptors)(cache_interceptor_1.CustomCacheInterceptor),
    (0, common_1.Get)('workout-detail/:slug/:week/:workout'),
    (0, cache_manager_1.CacheTTL)(10 * 60 * 1000),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Param)('week', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('workout', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], TrainingSheetController.prototype, "getWorkoutDetail", null);
TrainingSheetController = __decorate([
    (0, common_1.Controller)('training-sheet'),
    __metadata("design:paramtypes", [training_sheet_service_1.TrainingSheetService])
], TrainingSheetController);
exports.TrainingSheetController = TrainingSheetController;
//# sourceMappingURL=training-sheet.controller.js.map