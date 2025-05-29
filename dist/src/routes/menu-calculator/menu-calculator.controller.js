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
const menu_calculator_service_1 = require("./menu-calculator.service");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
const core_controller_v2_controller_1 = require("../../core/utils/core-controller-v2.controller");
const validation_pipe_1 = require("../../core/pipes/validation.pipe");
let MenuCalculatorController = class MenuCalculatorController extends core_controller_v2_controller_1.CoreControllerV2 {
    constructor(menuCalculatorService) {
        super(menuCalculatorService, create_menu_dto_1.CreateMenuDto, update_menu_dto_1.UpdateMenuDto);
        this.menuCalculatorService = menuCalculatorService;
    }
    async findByCalories(calories) {
        return this.menuCalculatorService.findByCalories(Number(calories));
    }
};
__decorate([
    (0, common_1.Get)('find-by-calories/:calories'),
    __param(0, (0, common_1.Param)('calories', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuCalculatorController.prototype, "findByCalories", null);
MenuCalculatorController = __decorate([
    (0, common_1.Controller)('menu-calculator'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe()),
    __metadata("design:paramtypes", [menu_calculator_service_1.MenuCalculatorService])
], MenuCalculatorController);
exports.MenuCalculatorController = MenuCalculatorController;
//# sourceMappingURL=menu-calculator.controller.js.map