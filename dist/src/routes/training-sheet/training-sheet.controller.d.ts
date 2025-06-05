import { TrainingSheetService } from './training-sheet.service';
import { CreateTrainingSheetDto } from './dto/create-training-sheet.dto';
import { UpdateTrainingSheetDto } from './dto/update-training-sheet.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { TrainingSheet } from './entities/training-sheet.entity';
import { MulterFile } from 'multer';
import { Response } from 'express';
export declare class TrainingSheetController extends CoreController<TrainingSheet, TrainingSheetService, CreateTrainingSheetDto, UpdateTrainingSheetDto> {
    private readonly trainingSheetService;
    constructor(trainingSheetService: TrainingSheetService);
    createWithFile(createDto: any, file: {
        file?: MulterFile[];
    }): Promise<any>;
    updateWithFile(id: string, updateDto: any, file: {
        file?: MulterFile[];
    }): Promise<any>;
    getFile(id: string, res: Response): Promise<void>;
    getPlannerHome(slug: string): Promise<TrainingSheet>;
    getWeekData(slug: string, week: string): Promise<{
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
