import { TrainingAccessService } from './training-access.service';
import { CreateTrainingAccessDto } from './dto/create-training-access.dto';
export declare class TrainingAccessController {
    private readonly service;
    constructor(service: TrainingAccessService);
    create(dto: CreateTrainingAccessDto): Promise<import("./entities/training-access.entity").TrainingAccess>;
    top5(): Promise<{
        trainingId: any;
        count: number;
    }[]>;
}
