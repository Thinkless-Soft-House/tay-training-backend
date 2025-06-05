import { ExerciseConfigurations } from './ExerciseConfigurations';
export declare class Exercises {
    id: number;
    name: string;
    videoUrl: string | null;
    hasMethod: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    exerciseConfigurations: ExerciseConfigurations[];
}
