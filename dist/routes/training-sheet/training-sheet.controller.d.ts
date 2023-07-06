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
    }): Promise<TrainingSheet>;
    updateWithFile(id: string, updateDto: any, file: {
        file?: MulterFile[];
    }): Promise<TrainingSheet>;
    getFile(id: string, res: Response): Promise<void>;
}
