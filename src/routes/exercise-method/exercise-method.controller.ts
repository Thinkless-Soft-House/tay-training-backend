import { Controller } from '@nestjs/common';
import { ExerciseMethodService } from './exercise-method.service';
import { CreateExerciseMethodDto } from './dto/create-exercise-method.dto';
import { UpdateExerciseMethodDto } from './dto/update-exercise-method.dto';
import { ExerciseMethod } from './entities/exercise-method.entity';
import { CoreController } from 'src/core/utils/core-controller.controller';

@Controller('exercise-method')
export class ExerciseMethodController extends CoreController<
  ExerciseMethod,
  ExerciseMethodService,
  CreateExerciseMethodDto,
  UpdateExerciseMethodDto
> {
  constructor(private readonly exerciseMethodService: ExerciseMethodService) {
    super(exerciseMethodService);
  }
}
