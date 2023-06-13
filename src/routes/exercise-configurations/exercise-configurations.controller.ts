import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ExerciseConfigurationsService } from './exercise-configurations.service';
import { CreateExerciseConfigurationDto } from './dto/create-exercise-configuration.dto';
import { UpdateExerciseConfigurationDto } from './dto/update-exercise-configuration.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { ExerciseConfiguration } from './entities/exercise-configuration.entity';

import { getConnection, getConnectionManager, QueryRunner } from 'typeorm';

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

  @Patch('update-list')
  async updateListOfExerciseGroups(@Body() body: ExerciseConfiguration[]) {
    return this.exerciseConfigurationsService.updateListOfExerciseGroups(body);
  }
}
