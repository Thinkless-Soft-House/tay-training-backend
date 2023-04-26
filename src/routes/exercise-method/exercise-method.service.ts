import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/core/utils/core-service.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseMethod } from './entities/exercise-method.entity';

@Injectable()
export class ExerciseMethodService extends CoreService<ExerciseMethod> {
  constructor(
    @InjectRepository(ExerciseMethod)
    exerciseGroupRepository: Repository<ExerciseMethod>,
  ) {
    super(exerciseGroupRepository);
  }
}
