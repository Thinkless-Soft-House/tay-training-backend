import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { Exercise } from './entities/exercise.entity';
export declare class ExercisesController extends CoreController<Exercise, ExercisesService, CreateExerciseDto, UpdateExerciseDto> {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
}
