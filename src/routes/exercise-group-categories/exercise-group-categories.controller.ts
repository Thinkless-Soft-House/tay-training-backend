import { Controller } from '@nestjs/common';
import { ExerciseGroupCategoriesService } from './exercise-group-categories.service';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { CreateExerciseGroupCategoryDto } from './dto/create-exercise-group-category.dto';
import { UpdateExerciseGroupCategoryDto } from './dto/update-exercise-group-category.dto';
import { ExerciseGroupCategory } from './entities/exercise-group-category.entity';

@Controller('exercise-group-categories')
export class ExerciseGroupCategoriesController extends CoreController<
  ExerciseGroupCategory,
  ExerciseGroupCategoriesService,
  CreateExerciseGroupCategoryDto,
  UpdateExerciseGroupCategoryDto
> {
  constructor(
    private readonly exerciseGroupCategoriesService: ExerciseGroupCategoriesService,
  ) {
    super(exerciseGroupCategoriesService);
  }
}
