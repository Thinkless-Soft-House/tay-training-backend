import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
import { ExerciseGroup } from './entities/exercise-group.entity';
export declare class ExerciseGroupsService extends CoreService<ExerciseGroup> {
    constructor(exerciseGroupsRepository: Repository<ExerciseGroup>);
    createWhere(query: any): {};
}
