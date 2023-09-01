/// <reference types="node" />
import { TrainingSheet } from './entities/training-sheet.entity';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
import { MulterFile } from 'multer';
import { FileService } from 'src/core/services/File.service';
export declare class TrainingSheetService extends CoreService<TrainingSheet> {
    private fileService;
    constructor(trainingSheetRepository: Repository<TrainingSheet>, fileService: FileService);
    getFile(id: number): Promise<Buffer>;
    createWhere(query: any): {};
    create(createDto: any): Promise<TrainingSheet>;
    createWithFile(createDto: any, file: MulterFile): Promise<TrainingSheet>;
    updateWithFile(id: number, updateDto: any, file: MulterFile): Promise<TrainingSheet>;
}
