import { Injectable } from '@nestjs/common';
import { CreateExerciseGroupCategoryDto } from './dto/create-exercise-group-category.dto';
import { UpdateExerciseGroupCategoryDto } from './dto/update-exercise-group-category.dto';
import { ExerciseGroupCategory } from './entities/exercise-group-category.entity';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
import { ExerciseGroup } from '../exercise-groups/entities/exercise-group.entity';

@Injectable()
export class ExerciseGroupCategoriesService extends CoreService<ExerciseGroupCategory> {
  constructor(
    @InjectRepository(ExerciseGroupCategory)
    exerciseGroupsCategoryRepository: Repository<ExerciseGroupCategory>,
  ) {
    super(exerciseGroupsCategoryRepository);
  }
}
