import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { TrainingDay } from 'src/routes/training-day/entities/training-day.entity';
import { Relation } from 'typeorm';
export declare class TrainingSheet extends CoreEntity {
    name: string;
    publicName: string;
    slug: string;
    offlinePdf: string;
    trainingDays: Relation<TrainingDay[]>;
}
