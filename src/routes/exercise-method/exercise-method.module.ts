import { Module } from '@nestjs/common';
import { ExerciseMethodService } from './exercise-method.service';
import { ExerciseMethodController } from './exercise-method.controller';

@Module({
  controllers: [ExerciseMethodController],
  providers: [ExerciseMethodService]
})
export class ExerciseMethodModule {}
