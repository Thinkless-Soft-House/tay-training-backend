import { Controller } from '@nestjs/common';
import { ExerciseGroupsService } from './exercise-groups.service';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { ExerciseGroup } from './entities/exercise-group.entity';

@Controller('exercise-groups')
export class ExerciseGroupsController extends CoreController<
  ExerciseGroup,
  ExerciseGroupsService,
  CreateExerciseGroupDto,
  UpdateExerciseGroupDto
> {
  constructor(private readonly exerciseGroupsService: ExerciseGroupsService) {
    super(exerciseGroupsService);
  }
}
