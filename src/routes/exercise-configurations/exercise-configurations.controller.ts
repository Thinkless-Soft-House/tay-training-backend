import { Controller } from '@nestjs/common';
import { ExerciseConfigurationsService } from './exercise-configurations.service';
import { CreateExerciseConfigurationDto } from './dto/create-exercise-configuration.dto';
import { UpdateExerciseConfigurationDto } from './dto/update-exercise-configuration.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { ExerciseConfiguration } from './entities/exercise-configuration.entity';

@Controller('exercise-configurations')
export class ExerciseConfigurationsController extends CoreController<
  ExerciseConfiguration,
  ExerciseConfigurationsService,
  CreateExerciseConfigurationDto,
  UpdateExerciseConfigurationDto
> {
  constructor(
    private readonly exerciseConfigurationsService: ExerciseConfigurationsService,
  ) {
    super(exerciseConfigurationsService);
  }
}
