import { Injectable } from '@nestjs/common';
import { ExerciseConfiguration } from './entities/exercise-configuration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseConfigurationsService extends CoreService<ExerciseConfiguration> {
  constructor(
    @InjectRepository(ExerciseConfiguration)
    methodsRepository: Repository<ExerciseConfiguration>,
  ) {
    super(methodsRepository);
  }
}
