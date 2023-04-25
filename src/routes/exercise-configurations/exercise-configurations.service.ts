import { Injectable } from '@nestjs/common';
import { CreateExerciseConfigurationDto } from './dto/create-exercise-configuration.dto';
import { UpdateExerciseConfigurationDto } from './dto/update-exercise-configuration.dto';

@Injectable()
export class ExerciseConfigurationsService {
  create(createExerciseConfigurationDto: CreateExerciseConfigurationDto) {
    return 'This action adds a new exerciseConfiguration';
  }

  findAll() {
    return `This action returns all exerciseConfigurations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseConfiguration`;
  }

  update(id: number, updateExerciseConfigurationDto: UpdateExerciseConfigurationDto) {
    return `This action updates a #${id} exerciseConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseConfiguration`;
  }
}
