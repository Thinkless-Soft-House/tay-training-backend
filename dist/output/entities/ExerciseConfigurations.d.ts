import { Exercises } from './Exercises';
import { ExerciseMethods } from './ExerciseMethods';
import { Methods } from './Methods';
export declare class ExerciseConfigurations {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    series: string;
    repetitions: string;
    exercise: Exercises;
    exerciseMethod: ExerciseMethods;
    method: Methods;
}
