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
const common_1 = require("@nestjs/common");
const menu_entity_1 = require("./entities/menu.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const core_service_service_1 = require("../../core/utils/core-service.service");
let MenuCalculatorService = class MenuCalculatorService extends core_service_service_1.CoreService {
    constructor(menuRepository) {
        super(menuRepository);
        this.menuRepository = menuRepository;
    }
    createWhere(query) {
        let where = {};
        if (query.name)
            where['name'] = (0, typeorm_1.ILike)(`%${query.name}%`);
        if (query.description)
            where['description'] = (0, typeorm_1.ILike)(`%${query.description}%`);
        if (query.status)
            where['status'] = query.status;
        if (query.filter) {
            const aux = where;
            where = [
                Object.assign(Object.assign({}, aux), { name: (0, typeorm_1.ILike)(`%${query.filter}%`) }),
                Object.assign(Object.assign({}, aux), { description: (0, typeorm_1.ILike)(`%${query.filter}%`) }),
            ];
        }
        return where;
    }
    async findByCalories(calories) {
        const menu = await this.menuRepository.createQueryBuilder('menu')
            .where('menu.minCalories <= :mincalories', { mincalories: calories })
            .andWhere('menu.maxCalories >= :maxcalories', { maxcalories: calories })
            .orderBy('menu.minCalories', 'ASC')
            .getOne();
        if (!menu) {
            const minprox = await this.menuRepository.createQueryBuilder('menu')
                .where('menu.minCalories <= :mincalories', { mincalories: calories })
                .orderBy('menu.minCalories', 'DESC')
                .getOne();
            const maxprox = await this.menuRepository.createQueryBuilder('menu')
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
};
MenuCalculatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MenuCalculatorService);
exports.MenuCalculatorService = MenuCalculatorService;
//# sourceMappingURL=menu-calculator.service.js.map