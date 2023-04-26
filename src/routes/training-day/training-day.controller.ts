import { Controller } from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';
import { TrainingDay } from './entities/training-day.entity';
import { CoreController } from 'src/core/utils/core-controller.controller';

@Controller('training-day')
export class TrainingDayController extends CoreController<
  TrainingDay,
  TrainingDayService,
  CreateTrainingDayDto,
  UpdateTrainingDayDto
> {
  constructor(private readonly trainingDayService: TrainingDayService) {
    super(trainingDayService);
  }
}
