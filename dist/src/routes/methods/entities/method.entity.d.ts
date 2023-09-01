import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseMethod } from 'src/routes/exercise-method/entities/exercise-method.entity';
import { Relation } from 'typeorm';
export declare class Method extends CoreEntity {
    name: string;
    description: string;
    exerciseConfigurations: Relation<ExerciseMethod[]>;
}
