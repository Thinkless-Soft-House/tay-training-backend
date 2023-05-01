import { Injectable } from '@nestjs/common';
import { TrainingDay } from './entities/training-day.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingDayService extends CoreService<TrainingDay> {
  constructor(
    @InjectRepository(TrainingDay)
    trainingDaysRepository: Repository<TrainingDay>,
  ) {
    super(trainingDaysRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.day) where['day'] = query.day;
    if (query.trainingSheetId) where['trainingSheetId'] = query.trainingSheetId;
    if (query.exerciseGroupId) where['exerciseGroupId'] = query.exerciseGroupId;

    return where;
  }

  getTrainingDaysByTrainingSheetId(trainingSheetId: number) {
    return this.repository.find({
      where: { trainingSheetId },
    });
  }
}
