import { Module } from '@nestjs/common';
import { MethodsService } from './methods.service';
import { MethodsController } from './methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Method } from './entities/method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Method])],
  controllers: [MethodsController],
  providers: [MethodsService],
})
export class MethodsModule {}
