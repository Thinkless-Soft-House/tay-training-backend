import { Injectable } from '@nestjs/common';
import { ExerciseGroupCategory } from './entities/exercise-group-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseGroupCategoriesService extends CoreService<ExerciseGroupCategory> {
  constructor(
    @InjectRepository(ExerciseGroupCategory)
    exerciseGroupsCategoryRepository: Repository<ExerciseGroupCategory>,
  ) {
    super(exerciseGroupsCategoryRepository);
  }
}
