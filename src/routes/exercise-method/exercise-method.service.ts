import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/core/utils/core-service.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ExerciseMethod } from './entities/exercise-method.entity';
import { ErrorHandler } from 'src/core/handlers/error.handler';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';

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

  async clearByExerciseGroupId(exerciseGroupId: number) {
    try {
      // Check if item exists
      const whereId: any = { exerciseGroupId };
      const item = await this.repository.find({
        where: whereId,
      });

      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }

      // Delete item
      await this.repository.delete({ exerciseGroupId });
      return item;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }
}
