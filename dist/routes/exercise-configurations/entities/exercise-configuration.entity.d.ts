import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseMethod } from 'src/routes/exercise-method/entities/exercise-method.entity';
import { Exercise } from 'src/routes/exercises/entities/exercise.entity';
import { Relation } from 'typeorm';
export declare class ExerciseConfiguration extends CoreEntity {
    series: string;
    reps: string;
    exerciseMethodId: number;
    exerciseId: number;
    exerciseMethod: Relation<ExerciseMethod>;
    exercise: Relation<Exercise>;
}
