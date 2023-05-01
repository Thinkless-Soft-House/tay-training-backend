import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
import { ExerciseMethod } from './entities/exercise-method.entity';
export declare class ExerciseMethodService extends CoreService<ExerciseMethod> {
    constructor(exerciseGroupRepository: Repository<ExerciseMethod>);
    createWhere(query: any): {};
}
