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
    let where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);
    if (query.publicName) where['publicName'] = ILike(`%${query.publicName}%`);

    if (query.category) where['category_id'] = query.category;

    if (query.filter) {
      const aux = where;
      where = [
        { ...aux, name: ILike(`%${query.filter}%`) },
        { ...aux, category: ILike(`%${query.filter}%`) },
      ];
    }

    return where;
  }
}
