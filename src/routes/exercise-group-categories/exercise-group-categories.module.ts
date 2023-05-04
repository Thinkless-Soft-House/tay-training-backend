import { Module } from '@nestjs/common';
import { ExerciseGroupCategoriesService } from './exercise-group-categories.service';
import { ExerciseGroupCategoriesController } from './exercise-group-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseGroupCategory } from './entities/exercise-group-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseGroupCategory])],
  controllers: [ExerciseGroupCategoriesController],
  providers: [ExerciseGroupCategoriesService],
})
export class ExerciseGroupCategoriesModule {}
