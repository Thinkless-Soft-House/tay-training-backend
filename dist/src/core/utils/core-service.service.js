"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreService = void 0;
const typeorm_utils_1 = require("../functions/typeorm.utils");
const error_handler_1 = require("../handlers/error.handler");
class CoreService {
    constructor(repository) {
        this.repository = repository;
    }
    createWhere(query) {
        const where = {};
        return where;
    }
    async create(createDto) {
        try {
            const newItem = this.repository.create(createDto);
            const create$ = await this.repository.save(newItem);
            return create$;
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async createMany(items) {
        try {
            const res = [];
            for (const item of items) {
                const r = await this.create(item);
                res.push(r);
            }
            return res;
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async findByFilter(query) {
        const where = this.createWhere(query);
        try {
            const orderField = query.orderField || query.orderColumn || 'id';
            const orderDirection = (query.orderDirection || query.order || 'ASC').toUpperCase();
            const results = await this.repository.findAndCount({
                where,
                relations: query.relations ? query.relations.split(',') : [],
                take: query.take,
                skip: query.skip,
                order: {
                    [orderField]: orderDirection,
                },
            });
            return {
                data: results[0],
                count: results[1],
            };
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async findAll(relations) {
        try {
            const rel = relations ? relations : [];
            return await this.repository.find({
                relations: rel,
            });
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async findOne(id, relations) {
        try {
            const whereId = { id };
            const rel = relations ? relations : [];
            const item = await this.repository.findOne({
                where: whereId,
                relations: rel,
            });
            return item;
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async update(id, updateDto) {
        try {
            const whereId = { id };
            const item = await this.repository.findOne({
                where: whereId,
            });
            if (!item) {
                throw new error_handler_1.ErrorHandler('Item não encontrado', 404, 404);
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
    async updateMany(items) {
        try {
            items.map(async (item) => {
                return this.update(item.id, item.data);
            });
            return await Promise.all(items);
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
    async remove(id) {
        try {
            return true;
        }
        catch (error) {
            throw (0, typeorm_utils_1.translateTypeORMError)(error);
        }
    }
}
exports.CoreService = CoreService;
//# sourceMappingURL=core-service.service.js.map