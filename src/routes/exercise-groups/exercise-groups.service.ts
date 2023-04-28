import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/utils/core-service.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ExerciseGroup } from './entities/exercise-group.entity';

@Injectable()
export class ExerciseGroupsService extends CoreService<ExerciseGroup> {
  constructor(
    @InjectRepository(ExerciseGroup)
    exerciseGroupsRepository: Repository<ExerciseGroup>,
  ) {
    super(exerciseGroupsRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);

    if (query.category) where['category'] = ILike(`%${query.category}%`);

    return where;
  }
}
