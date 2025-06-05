import { ExerciseGroupCategories } from './ExerciseGroupCategories';
import { ExerciseMethods } from './ExerciseMethods';
import { TrainingDays } from './TrainingDays';
export declare class ExerciseGroups {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    publicName: string | null;
    category: ExerciseGroupCategories;
    exerciseMethods: ExerciseMethods[];
    trainingDays: TrainingDays[];
}
