import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingAccess } from './entities/training-access.entity';
import { TrainingAccessService } from './training-access.service';
import { TrainingAccessController } from './training-access.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingAccess])],
  providers: [TrainingAccessService],
  controllers: [TrainingAccessController],
})
export class TrainingAccessModule {}
