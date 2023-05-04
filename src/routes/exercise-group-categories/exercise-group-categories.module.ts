import { Module } from '@nestjs/common';
import { ExerciseGroupCategoriesService } from './exercise-group-categories.service';
import { ExerciseGroupCategoriesController } from './exercise-group-categories.controller';

@Module({
  controllers: [ExerciseGroupCategoriesController],
  providers: [ExerciseGroupCategoriesService]
})
export class ExerciseGroupCategoriesModule {}
