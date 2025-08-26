import { Repository } from 'typeorm';
import { TrainingAccess } from './entities/training-access.entity';
export declare class TrainingAccessService {
    private repo;
    constructor(repo: Repository<TrainingAccess>);
    create(clientId: string, trainingId: string): Promise<TrainingAccess>;
    top5Today(): Promise<{
        trainingId: any;
        count: number;
    }[]>;
}
