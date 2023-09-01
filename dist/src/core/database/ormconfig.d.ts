import { TypeOrmModuleOptions } from '@nestjs/typeorm';
declare function createOrmConfig(connData: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    synchronize: string;
}): TypeOrmModuleOptions;
export default createOrmConfig;
