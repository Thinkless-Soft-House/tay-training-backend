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
            ssl: {
                rejectUnauthorized: false,
            },
        },
    };
}
exports.default = createOrmConfig;
//# sourceMappingURL=ormconfig.js.map