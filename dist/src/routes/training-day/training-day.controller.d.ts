import { TrainingDayService } from './training-day.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';
import { TrainingDay } from './entities/training-day.entity';
import { CoreController } from 'src/core/utils/core-controller.controller';
export declare class TrainingDayController extends CoreController<TrainingDay, TrainingDayService, CreateTrainingDayDto, UpdateTrainingDayDto> {
    private readonly trainingDayService;
    constructor(trainingDayService: TrainingDayService);
    updateListOfExerciseGroups(body: TrainingDay[]): Promise<{
        new: TrainingDay[];
        deleted: TrainingDay[];
    }>;
}
