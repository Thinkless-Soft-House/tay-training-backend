import { ExerciseGroupCategory } from './entities/exercise-group-category.entity';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
export declare class ExerciseGroupCategoriesService extends CoreService<ExerciseGroupCategory> {
    constructor(exerciseGroupsCategoryRepository: Repository<ExerciseGroupCategory>);
}
