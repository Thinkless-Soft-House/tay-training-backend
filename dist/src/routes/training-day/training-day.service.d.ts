import { TrainingDay } from './entities/training-day.entity';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';
export declare class TrainingDayService extends CoreService<TrainingDay> {
    constructor(trainingDaysRepository: Repository<TrainingDay>);
    createWhere(query: any): {};
    getTrainingDaysByTrainingSheetId(trainingSheetId: number): Promise<TrainingDay[]>;
}
