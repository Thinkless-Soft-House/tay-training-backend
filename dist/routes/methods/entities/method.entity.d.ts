import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseConfiguration } from 'src/routes/exercise-configurations/entities/exercise-configuration.entity';
import { Relation } from 'typeorm';
export declare class Method extends CoreEntity {
    name: string;
    description: string;
    exerciseConfigurations: Relation<ExerciseConfiguration[]>;
}
