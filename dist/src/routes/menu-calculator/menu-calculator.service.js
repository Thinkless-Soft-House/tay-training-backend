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
exports.MenuCalculatorService = void 0;
const fs = require("fs");
const path = require("path");
const File_service_1 = require("../../core/services/File.service");
const error_handler_1 = require("../../core/handlers/error.handler");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menu_entity_1 = require("./entities/menu.entity");
const typeorm_2 = require("typeorm");
const core_service_service_1 = require("../../core/utils/core-service.service");
let MenuCalculatorService = class MenuCalculatorService extends core_service_service_1.CoreService {
    constructor(menuRepository, fileService) {
        super(menuRepository);
        this.menuRepository = menuRepository;
        this.fileService = fileService;
    }
    createWhere(query) {
        let where = {};
        let filters = query.filters;
        if (typeof filters === 'string') {
            try {
                filters = JSON.parse(filters);
            }
            catch (_a) {
                filters = [];
            }
        }
        if (Array.isArray(filters) && filters.length > 0) {
            where = filters.map((filter) => {
                const isNumericField = ['minCalories', 'maxCalories'].includes(filter.field);
                if (filter.operator === 'like' && isNumericField) {
                    const num = parseInt((filter.value || '').replace(/[^0-9]/g, ''));
                    if (!isNaN(num)) {
                        return { [filter.field]: num };
                    }
                    return {};
                }
                else if (filter.operator === 'like') {
                    return { [filter.field]: (0, typeorm_2.ILike)(filter.value) };
                }
                else if (filter.operator === '=' && isNumericField) {
                    return { [filter.field]: Number(filter.value) };
                }
                else if (filter.operator === '=') {
                    return { [filter.field]: filter.value };
                }
                return {};
            });
        }
        else {
            if (query.name)
                where['name'] = (0, typeorm_2.ILike)(`%${query.name}%`);
            if (query.description)
                where['description'] = (0, typeorm_2.ILike)(`%${query.description}%`);
            if (query.status)
                where['status'] = query.status;
            if (query.filter) {
                const aux = where;
                where = [
                    Object.assign(Object.assign({}, aux), { name: (0, typeorm_2.ILike)(`%${query.filter}%`) }),
                    Object.assign(Object.assign({}, aux), { description: (0, typeorm_2.ILike)(`%${query.filter}%`) }),
                ];
            }
        }
        return where;
    }
    async findByCalories(calories) {
        const menu = await this.menuRepository
            .createQueryBuilder('menu')
            .where('menu.minCalories <= :mincalories', { mincalories: calories })
            .andWhere('menu.maxCalories >= :maxcalories', { maxcalories: calories })
            .orderBy('menu.minCalories', 'ASC')
            .getOne();
        if (!menu) {
            const minprox = await this.menuRepository
                .createQueryBuilder('menu')
                .where('menu.minCalories <= :mincalories', { mincalories: calories })
                .orderBy('menu.minCalories', 'DESC')
                .getOne();
            const maxprox = await this.menuRepository
                .createQueryBuilder('menu')
                .where('menu.maxCalories >= :maxcalories', { maxcalories: calories })
                .orderBy('menu.maxCalories', 'ASC')
                .getOne();
            if (minprox && maxprox) {
                const diffMin = Math.abs(calories - minprox.maxCalories);
                const diffMax = Math.abs(maxprox.minCalories - calories);
                return diffMin <= diffMax ? minprox : maxprox;
            }
            else if (minprox) {
                return minprox;
            }
            else if (maxprox) {
                return maxprox;
            }
            else {
                throw new common_1.NotFoundException('Nenhum menu encontrado para as calorias informadas');
            }
        }
        return menu;
    }
    async create(createDto) {
        try {
            const newItem = this.menuRepository.create(createDto);
            return await this.menuRepository.save(newItem);
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, 400, 400);
        }
    }
    async createWithFile(createDto, file) {
        try {
            let pdfUrl = '';
            if (file) {
                const safeName = String(createDto.name || 'menu')
                    .toLowerCase()
                    .replace(/[^a-z0-9]/gi, '_')
                    .replace(/_+/g, '_')
                    .replace(/^_+|_+$/g, '');
                const fileName = `menu_${safeName}.pdf`;
                const fileDir = path.resolve(process.cwd(), 'files/menus');
                if (!fs.existsSync(fileDir)) {
                    fs.mkdirSync(fileDir, { recursive: true });
                }
                const fullFilePath = path.join(fileDir, fileName);
                await this.fileService.createFile(fileDir + '/', fileName, file.buffer);
                pdfUrl = `./files/menus/${fileName}`;
            }
            const newItem = this.menuRepository.create(Object.assign(Object.assign({}, createDto), { pdfUrl }));
            const created = await this.menuRepository.save(newItem);
            return created;
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, 400, 400);
        }
    }
    async updateWithFile(id, updateDto, file) {
        try {
            const item = await this.menuRepository.findOne({ where: { id } });
            if (!item)
                throw new error_handler_1.ErrorHandler('Item não encontrado', 404, 404);
            let pdfUrl = updateDto.pdfUrl || item.pdfUrl;
            if (file) {
                const safeName = String(updateDto.name || item.name || 'menu')
                    .toLowerCase()
                    .replace(/[^a-z0-9]/gi, '_')
                    .replace(/_+/g, '_')
                    .replace(/^_+|_+$/g, '');
                const fileName = `menu_${safeName}.pdf`;
                const fileDir = path.resolve(process.cwd(), 'files/menus');
                if (!fs.existsSync(fileDir)) {
                    fs.mkdirSync(fileDir, { recursive: true });
                }
                const fullFilePath = path.join(fileDir, fileName);
                await this.fileService.createFile(fileDir + '/', fileName, file.buffer);
                pdfUrl = `./files/menus/${fileName}`;
            }
            const dto = Object.assign(Object.assign(Object.assign({}, item), updateDto), { pdfUrl });
            await this.menuRepository.update(id, dto);
            return await this.menuRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new error_handler_1.ErrorHandler(error.message, 400, 400);
        }
    }
    async getFilePath(id) {
        const item = await this.menuRepository.findOne({ where: { id } });
        if (!item || !item.pdfUrl)
            throw new error_handler_1.ErrorHandler('Arquivo não encontrado', 404, 404);
        return item.pdfUrl;
    }
};
MenuCalculatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        File_service_1.FileService])
], MenuCalculatorService);
exports.MenuCalculatorService = MenuCalculatorService;
//# sourceMappingURL=menu-calculator.service.js.map