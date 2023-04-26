import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/utils/core-service.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseGroup } from './entities/exercise-group.entity';

@Injectable()
export class ExerciseGroupsService extends CoreService<ExerciseGroup> {
  constructor(
    @InjectRepository(ExerciseGroup)
    exerciseGroupsRepository: Repository<ExerciseGroup>,
  ) {
    super(exerciseGroupsRepository);
  }
}
