import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseConfiguration } from 'src/routes/exercise-configurations/entities/exercise-configuration.entity';
import { Relation } from 'typeorm';
export declare class Exercise extends CoreEntity {
    name: string;
    description: string;
    videoUrl: string;
    hasMethod: boolean;
    exerciseConfigurations: Relation<ExerciseConfiguration[]>;
}
