import { ExerciseConfiguration } from './entities/exercise-configuration.entity';
import { CoreService } from 'src/core/utils/core-service.service';
import { QueryRunner, Repository } from 'typeorm';
export declare class ExerciseConfigurationsService extends CoreService<ExerciseConfiguration> {
    constructor(methodsRepository: Repository<ExerciseConfiguration>);
    createWhere(query: any): {};
    getExerciseConfigurationsByExerciseMethodId(exerciseMethodId: number): Promise<ExerciseConfiguration[]>;
    updateListOfExerciseGroups(body: ExerciseConfiguration[]): Promise<{
        new: number;
        deleted: number;
        updated: number;
    }>;
    createManyQueryRunner(queryRunner: QueryRunner, items: any[]): Promise<number>;
    deleteManyQueryRunner(queryRunner: QueryRunner, items: any[]): Promise<number>;
    updateManyQueryRunner(queryRunner: QueryRunner, items: any[]): Promise<number>;
}
