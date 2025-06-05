import { ExerciseGroupCategoriesService } from './exercise-group-categories.service';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { CreateExerciseGroupCategoryDto } from './dto/create-exercise-group-category.dto';
import { UpdateExerciseGroupCategoryDto } from './dto/update-exercise-group-category.dto';
import { ExerciseGroupCategory } from './entities/exercise-group-category.entity';
export declare class ExerciseGroupCategoriesController extends CoreController<ExerciseGroupCategory, ExerciseGroupCategoriesService, CreateExerciseGroupCategoryDto, UpdateExerciseGroupCategoryDto> {
    private readonly exerciseGroupCategoriesService;
    constructor(exerciseGroupCategoriesService: ExerciseGroupCategoriesService);
}
