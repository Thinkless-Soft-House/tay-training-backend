import { ExerciseConfigurations } from './ExerciseConfigurations';
import { ExerciseGroups } from './ExerciseGroups';
export declare class ExerciseMethods {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    rest: string;
    observations: string | null;
    order: number | null;
    exerciseConfigurations: ExerciseConfigurations[];
    exerciseGroup: ExerciseGroups;
}
