import { Controller } from '@nestjs/common';
import { TrainingSheetService } from './training-sheet.service';
import { CreateTrainingSheetDto } from './dto/create-training-sheet.dto';
import { UpdateTrainingSheetDto } from './dto/update-training-sheet.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { TrainingSheet } from './entities/training-sheet.entity';

@Controller('training-sheet')
export class TrainingSheetController extends CoreController<
  TrainingSheet,
  TrainingSheetService,
  CreateTrainingSheetDto,
  UpdateTrainingSheetDto
> {
  constructor(private readonly trainingSheetService: TrainingSheetService) {
    super(trainingSheetService);
  }
}
