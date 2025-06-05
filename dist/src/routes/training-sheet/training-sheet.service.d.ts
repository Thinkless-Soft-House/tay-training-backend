/// <reference types="node" />
import { TrainingSheet } from './entities/training-sheet.entity';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
import { MulterFile } from 'multer';
import { FileService } from 'src/core/services/File.service';
export interface WeekData {
    id: number;
    publicName: string;
    slug: string;
    weekDays: (TrainingDay | null)[];
}
export interface TrainingDay {
    id: number;
    day: number;
    shortName: string;
    exerciseGroup: {
        id: number;
        publicName: string;
        category: {
            id: number;
            name: string;
        };
    };
}
export declare class TrainingSheetService extends CoreService<TrainingSheet> {
    private fileService;
    constructor(trainingSheetRepository: Repository<TrainingSheet>, fileService: FileService);
    getFile(id: number): Promise<Buffer>;
    createWhere(query: any): {};
    create(createDto: any): Promise<TrainingSheet>;
    createWithFile(createDto: any, file: MulterFile): Promise<TrainingSheet>;
    updateWithFile(id: number, updateDto: any, file: MulterFile): Promise<TrainingSheet>;
    getPlannerHomeData(slug: string): Promise<TrainingSheet>;
    getWeekData(slug: string, weekNumber: number): Promise<{
        id: number;
        publicName: string;
        slug: string;
        weekDays: any[];
    }>;
    getWorkoutDetail(slug: string, week: number, workoutIndex: number): Promise<{
        id: number;
        publicName: string;
        slug: string;
        workout: {
            id: number;
            publicName: string;
            observations: any;
            exerciseMethods: import("../exercise-method/entities/exercise-method.entity").ExerciseMethod[];
        };
    }>;
}
