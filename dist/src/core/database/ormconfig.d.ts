import { TypeOrmModuleOptions } from '@nestjs/typeorm';
declare function createOrmConfig(connData: any): TypeOrmModuleOptions;
export default createOrmConfig;
