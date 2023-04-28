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

  override createWhere(query: any) {
    const where = {};
    if (query.series) where['series'] = query.series;
    if (query.reps) where['reps'] = query.reps;
    if (query.rest) where['rest'] = query.rest;
    if (query.exerciseMethodId)
      where['exerciseMethodId'] = query.exerciseMethodId;
    if (query.exerciseId) where['exerciseId'] = query.exerciseId;
    if (query.methodId) where['methodId'] = query.methodId;

    return where;
  }
}
