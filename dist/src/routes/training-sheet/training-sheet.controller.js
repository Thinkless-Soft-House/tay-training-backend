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
let TrainingSheetController = class TrainingSheetController extends core_controller_controller_1.CoreController {
    constructor(trainingSheetService) {
        super(trainingSheetService);
        this.trainingSheetService = trainingSheetService;
    }
    async createWithFile(createDto, file) {
        var _a, _b;
        try {
            console.log('TrainingSheetController.createWithFile() => Criando um novo treino com arquivo');
            let create$;
            if (file && !!file.file) {
                console.log('has file, file.file => ', file.file);
                create$ = await this.service.createWithFile(Object.assign(Object.assign({}, createDto), { trainingDays: JSON.parse(createDto.trainingDays) }), file.file[0].buffer);
            }
            else {
                console.log('has no file');
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
            console.log('TrainingSheetController.updateWithFile() => Atualizando um treino com arquivo');
            let update$;
            if (file && file.file) {
                console.log('has file');
                update$ = await this.service.updateWithFile(+id, updateDto, file.file[0].buffer);
            }
            else {
                console.log('has no file');
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
TrainingSheetController = __decorate([
    (0, common_1.Controller)('training-sheet'),
    __metadata("design:paramtypes", [training_sheet_service_1.TrainingSheetService])
], TrainingSheetController);
exports.TrainingSheetController = TrainingSheetController;
//# sourceMappingURL=training-sheet.controller.js.map