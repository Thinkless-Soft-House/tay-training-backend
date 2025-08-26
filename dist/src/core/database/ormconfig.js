"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function createOrmConfig(connData) {
    return {
        type: 'postgres',
        host: connData.host || 'localhost',
        port: parseInt(connData.port, 10) || 5432,
        username: connData.username || 'postgres',
        password: connData.password || '12345678',
        database: connData.database || 'mydb',
        entities: [(0, path_1.join)(__dirname, '../../**/*.entity{.ts,.js}')],
        synchronize: connData.synchronize === 'true',
        extra: {
            ssl: (() => {
                var _a, _b, _c;
                const flag = ((_c = (_b = (_a = connData.POSTGRES_SSL) !== null && _a !== void 0 ? _a : connData.postgres_ssl) !== null && _b !== void 0 ? _b : connData.postgresSsl) !== null && _c !== void 0 ? _c : 'false')
                    .toString()
                    .toLowerCase();
                return flag === 'true' ? { rejectUnauthorized: false } : false;
            })(),
        },
    };
}
exports.default = createOrmConfig;
//# sourceMappingURL=ormconfig.js.map