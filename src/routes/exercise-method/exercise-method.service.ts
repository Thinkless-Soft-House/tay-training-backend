import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/core/utils/core-service.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ExerciseMethod } from './entities/exercise-method.entity';

@Injectable()
export class ExerciseMethodService extends CoreService<ExerciseMethod> {
  constructor(
    @InjectRepository(ExerciseMethod)
    exerciseGroupRepository: Repository<ExerciseMethod>,
  ) {
    super(exerciseGroupRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.type) where['type'] = ILike(`%${query.type}%`);
    if (query.exerciseGroupId) where['exerciseGroupId'] = query.exerciseGroupId;

    return where;
  }
}
