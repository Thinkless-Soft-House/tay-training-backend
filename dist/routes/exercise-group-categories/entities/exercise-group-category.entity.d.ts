import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseGroup } from 'src/routes/exercise-groups/entities/exercise-group.entity';
import { Relation } from 'typeorm';
export declare class ExerciseGroupCategory extends CoreEntity {
    name: string;
    exerciseGroups: Relation<ExerciseGroup[]>;
}
