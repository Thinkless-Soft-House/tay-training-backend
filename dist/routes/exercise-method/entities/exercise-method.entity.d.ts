import { ExerciseConfiguration } from './../../exercise-configurations/entities/exercise-configuration.entity';
import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseGroup } from 'src/routes/exercise-groups/entities/exercise-group.entity';
import { Relation } from 'typeorm';
export declare class ExerciseMethod extends CoreEntity {
    type: string;
    exerciseGroupId: number;
    exerciseGroup: Relation<ExerciseGroup>;
    exerciseConfigurations: Relation<ExerciseConfiguration[]>;
}
