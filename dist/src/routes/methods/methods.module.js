"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsModule = void 0;
const common_1 = require("@nestjs/common");
const methods_service_1 = require("./methods.service");
const methods_controller_1 = require("./methods.controller");
const typeorm_1 = require("@nestjs/typeorm");
const method_entity_1 = require("./entities/method.entity");
let MethodsModule = class MethodsModule {
};
MethodsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([method_entity_1.Method])],
        controllers: [methods_controller_1.MethodsController],
        providers: [methods_service_1.MethodsService],
    })
], MethodsModule);
exports.MethodsModule = MethodsModule;
//# sourceMappingURL=methods.module.js.map