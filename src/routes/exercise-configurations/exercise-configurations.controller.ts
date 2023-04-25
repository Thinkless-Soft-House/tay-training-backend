import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExerciseConfigurationsService } from './exercise-configurations.service';
import { CreateExerciseConfigurationDto } from './dto/create-exercise-configuration.dto';
import { UpdateExerciseConfigurationDto } from './dto/update-exercise-configuration.dto';

@Controller('exercise-configurations')
export class ExerciseConfigurationsController {
  constructor(
    private readonly exerciseConfigurationsService: ExerciseConfigurationsService,
  ) {}

  @Post()
  create(
    @Body() createExerciseConfigurationDto: CreateExerciseConfigurationDto,
  ) {
    return this.exerciseConfigurationsService.create(
      createExerciseConfigurationDto,
    );
  }

  @Get()
  findAll() {
    return this.exerciseConfigurationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseConfigurationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseConfigurationDto: UpdateExerciseConfigurationDto,
  ) {
    return this.exerciseConfigurationsService.update(
      +id,
      updateExerciseConfigurationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseConfigurationsService.remove(+id);
  }
}
