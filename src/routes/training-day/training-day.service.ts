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
}
