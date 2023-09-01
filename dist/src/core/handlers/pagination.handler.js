"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationConfig = void 0;
function createPaginationConfig(query) {
    const take = +query.take || 10;
    const skip = +query.skip || 0;
    const orderColumn = query.orderColumn || 'id';
    const order = query.order || 'ASC';
    const paginationConfig = {
        take,
        skip,
        orderColumn,
        order,
    };
    return paginationConfig;
}
exports.createPaginationConfig = createPaginationConfig;
//# sourceMappingURL=pagination.handler.js.map