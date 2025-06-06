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
exports.MenuCalculatorController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const menu_calculator_service_1 = require("./menu-calculator.service");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
const core_controller_v2_controller_1 = require("../../core/utils/core-controller-v2.controller");
const validation_pipe_1 = require("../../core/pipes/validation.pipe");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let MenuCalculatorController = class MenuCalculatorController extends core_controller_v2_controller_1.CoreControllerV2 {
    constructor(menuCalculatorService) {
        super(menuCalculatorService, create_menu_dto_1.CreateMenuDto, update_menu_dto_1.UpdateMenuDto);
        this.menuCalculatorService = menuCalculatorService;
    }
    async findByCalories(calories) {
        return this.menuCalculatorService.findByCalories(Number(calories));
    }
    async createWithFile(createDto, file) {
        var _a;
        return this.menuCalculatorService.createWithFile(createDto, (_a = file === null || file === void 0 ? void 0 : file.file) === null || _a === void 0 ? void 0 : _a[0]);
    }
    async updateWithFile(id, updateDto, file) {
        var _a;
        return this.menuCalculatorService.updateWithFile(+id, updateDto, (_a = file === null || file === void 0 ? void 0 : file.file) === null || _a === void 0 ? void 0 : _a[0]);
    }
    async getFile(id, res) {
        const filePath = await this.menuCalculatorService.getFilePath(+id);
        const fileName = filePath.split('/').pop() || 'arquivo.pdf';
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        });
        const fileStream = (0, fs_1.createReadStream)(filePath);
        return new common_1.StreamableFile(fileStream);
    }
};
__decorate([
    (0, jwt_auth_guard_1.Public)(),
    (0, common_1.Get)('find-by-calories/:calories'),
    __param(0, (0, common_1.Param)('calories', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuCalculatorController.prototype, "findByCalories", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file', maxCount: 1 }])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuCalculatorController.prototype, "createWithFile", null);
__decorate([
    (0, common_1.Patch)('single/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'file', maxCount: 1 }])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MenuCalculatorController.prototype, "updateWithFile", null);
__decorate([
    (0, jwt_auth_guard_1.Public)(),
    (0, common_1.Get)('file/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MenuCalculatorController.prototype, "getFile", null);
MenuCalculatorController = __decorate([
    (0, common_1.Controller)('menu-calculator'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe()),
    __metadata("design:paramtypes", [menu_calculator_service_1.MenuCalculatorService])
], MenuCalculatorController);
exports.MenuCalculatorController = MenuCalculatorController;
//# sourceMappingURL=menu-calculator.controller.js.map