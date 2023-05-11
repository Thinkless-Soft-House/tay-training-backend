import { ExerciseGroupCategory } from 'src/routes/exercise-group-categories/entities/exercise-group-category.entity';
import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseMethod } from 'src/routes/exercise-method/entities/exercise-method.entity';
import { TrainingDay } from 'src/routes/training-day/entities/training-day.entity';
import { Relation } from 'typeorm';
export declare class ExerciseGroup extends CoreEntity {
    name: string;
    category_id: string;
    category: Relation<ExerciseGroupCategory>;
    exerciseMethods: Relation<ExerciseMethod[]>;
    trainingDays: Relation<TrainingDay[]>;
}
