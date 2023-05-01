import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseMethod } from 'src/routes/exercise-method/entities/exercise-method.entity';
import { TrainingDay } from 'src/routes/training-day/entities/training-day.entity';
import { Relation } from 'typeorm';
export declare class ExerciseGroup extends CoreEntity {
    name: string;
    category: string;
    exerciseMethods: Relation<ExerciseMethod[]>;
    trainingDays: Relation<TrainingDay[]>;
}
