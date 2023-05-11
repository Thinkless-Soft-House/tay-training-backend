import { TrainingSheet } from './entities/training-sheet.entity';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
export declare class TrainingSheetService extends CoreService<TrainingSheet> {
    constructor(trainingSheetRepository: Repository<TrainingSheet>);
    createWhere(query: any): {};
    create(createDto: any): Promise<TrainingSheet>;
}
