import { ExerciseConfiguration } from './entities/exercise-configuration.entity';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
export declare class ExerciseConfigurationsService extends CoreService<ExerciseConfiguration> {
    constructor(methodsRepository: Repository<ExerciseConfiguration>);
    createWhere(query: any): {};
    getExerciseConfigurationsByExerciseMethodId(exerciseMethodId: number): Promise<ExerciseConfiguration[]>;
}
