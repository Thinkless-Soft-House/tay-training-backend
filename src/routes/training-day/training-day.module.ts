import { Module } from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { TrainingDayController } from './training-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingDay } from './entities/training-day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingDay])],
  controllers: [TrainingDayController],
  providers: [TrainingDayService],
})
export class TrainingDayModule {}
