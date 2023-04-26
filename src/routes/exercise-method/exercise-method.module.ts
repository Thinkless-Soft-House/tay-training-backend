import { Module } from '@nestjs/common';
import { ExerciseMethodService } from './exercise-method.service';
import { ExerciseMethodController } from './exercise-method.controller';
import { ExerciseMethod } from './entities/exercise-method.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseMethod])],
  controllers: [ExerciseMethodController],
  providers: [ExerciseMethodService],
})
export class ExerciseMethodModule {}
