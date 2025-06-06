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
exports.CoreControllerV2 = void 0;
const common_1 = require("@nestjs/common");
const error_handler_1 = require("../handlers/error.handler");
const pagination_handler_1 = require("../handlers/pagination.handler");
const validation_config_1 = require("../../shared/config/validation.config");
class CoreControllerV2 {
    constructor(service, createEntityDtoClass, updateEntityDtoClass, validation = {}) {
        this.service = service;
        this.createEntityDtoClass = createEntityDtoClass;
        this.updateEntityDtoClass = updateEntityDtoClass;
        this.validation = validation;
    }
    async create(createDto) {
        var _a, _b;
        try {
            const obj = await validation_config_1.ValidationConfig.validationDTO({
                metatype: this.createEntityDtoClass,
                object: createDto,
            }, this.validation);
            return await this.service.create(obj);
        }
        catch (error) {
            if (validation_config_1.ValidationConfig.isValidationError(error)) {
                throw validation_config_1.ValidationConfig.handleError(error);
            }
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async createMany(createDto) {
        var _a, _b;
        try {
            const obj = await validation_config_1.ValidationConfig.validationListDTO({
                metatype: this.createEntityDtoClass,
                object: createDto,
            }, this.validation);
            return await this.service.createMany(obj);
        }
        catch (error) {
            if (validation_config_1.ValidationConfig.isValidationError(error)) {
                throw validation_config_1.ValidationConfig.handleError(error);
            }
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async findAll(query) {
        var _a, _b;
        try {
            const relations = query.relations
                ? query.relations.split(',')
                : [];
            return await this.service.findAll(relations);
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async findByFilter(query) {
        var _a, _b;
        try {
            const q = Object.assign(Object.assign({}, query), (0, pagination_handler_1.createPaginationConfig)(query));
            return await this.service.findByFilter(q);
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async findOne(id, query) {
        var _a, _b;
        try {
            const relations = query.relations
                ? query.relations.split(',')
                : [];
            const item = await this.service.findOne(+id, relations);
            if (!item) {
                throw new error_handler_1.ErrorHandler('Item não encontrado', 404, 404);
            }
            return item;
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async update(id, updateDto) {
        var _a, _b;
        try {
            const obj = await validation_config_1.ValidationConfig.validationDTO({
                metatype: this.updateEntityDtoClass,
                object: updateDto,
            }, this.validation);
            return await this.service.update(+id, obj);
        }
        catch (error) {
            if (validation_config_1.ValidationConfig.isValidationError(error)) {
                throw validation_config_1.ValidationConfig.handleError(error);
            }
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async updateMany(updateDto) {
        var _a, _b;
        try {
            const validatedData = [];
            for (const item of updateDto) {
                const obj = await validation_config_1.ValidationConfig.validationDTO({
                    metatype: this.updateEntityDtoClass,
                    object: item.data,
                }, this.validation);
                validatedData.push({ id: item.id, data: obj });
            }
            return await this.service.updateMany(validatedData);
        }
        catch (error) {
            if (validation_config_1.ValidationConfig.isValidationError(error)) {
                throw validation_config_1.ValidationConfig.handleError(error);
            }
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
    async remove(id) {
        var _a, _b;
        try {
            return await this.service.remove(+id);
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errorCode) || 400, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusCode) || 400);
        }
    }
}
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "findByFilter", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "updateMany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoreControllerV2.prototype, "remove", null);
exports.CoreControllerV2 = CoreControllerV2;
//# sourceMappingURL=core-controller-v2.controller.js.map