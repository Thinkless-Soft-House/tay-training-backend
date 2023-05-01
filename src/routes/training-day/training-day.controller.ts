import { Body, Controller, Patch } from '@nestjs/common';
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

  @Patch('update-list')
  async updateListOfExerciseGroups(@Body() body: TrainingDay[]) {
    // Pegar todos os ExerciseConfiguration desse method-exercise
    const tSheetId = body[0].trainingSheetId;
    const alreadyCreated: TrainingDay[] =
      await this.trainingDayService.getTrainingDaysByTrainingSheetId(tSheetId);
    // Separar os que são novos ou já existente dos que forma excluidos
    const newOnes = body.filter((ec) => !ec.id || !alreadyCreated.includes(ec));

    const deletedOnes = alreadyCreated.filter(
      (ec) =>
        !body
          .filter((b) => b.id)
          .map((b) => b.id)
          .includes(ec.id),
    );

    // return { new: newOnes, deleted: deletedOnes };
    // Insert or update nos que são novos/existentes
    const n = await this.createMany(newOnes);

    // Excluir os que não estão presentes
    const d$ = deletedOnes.map((ec) => this.trainingDayService.remove(ec.id));
    const d = await Promise.all(d$);

    return { new: n, deleted: d };
  }
}
