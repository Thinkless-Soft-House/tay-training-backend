import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class ExercisesService extends CoreService<Exercise> {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {
    super(exerciseRepository);
  }

  override createWhere(query: any) {
    let where = {};
    if (!query.filter) {
      if (query.name) where['name'] = ILike(`%${query.name}%`);

      if (query.description)
        where['description'] = ILike(`%${query.description}%`);

      if (query.videoUrl) where['videoUrl'] = ILike(`%${query.videoUrl}%`);

      if (query.hasMethod) where['hasMethod'] = query.hasMethod;
    } else {
      const aux = where;
      where = [
        { ...aux, name: ILike(`%${query.filter}%`) },
        { ...aux, description: ILike(`%${query.filter}%`) },
      ];
    }

    return where;
  }
}
