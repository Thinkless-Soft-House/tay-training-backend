import { ExerciseGroups } from './ExerciseGroups';
import { TrainingSheets } from './TrainingSheets';
export declare class TrainingDays {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    day: number;
    exerciseGroup: ExerciseGroups;
    trainingSheet: TrainingSheets;
}
