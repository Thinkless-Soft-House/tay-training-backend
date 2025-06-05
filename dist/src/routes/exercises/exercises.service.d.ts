import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { CoreService } from 'src/core/utils/core-service.service';
export declare class ExercisesService extends CoreService<Exercise> {
    private exerciseRepository;
    constructor(exerciseRepository: Repository<Exercise>);
    createWhere(query: any): {};
}
