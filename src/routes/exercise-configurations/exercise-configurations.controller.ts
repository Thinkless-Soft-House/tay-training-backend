import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ExerciseConfigurationsService } from './exercise-configurations.service';
import { CreateExerciseConfigurationDto } from './dto/create-exercise-configuration.dto';
import { UpdateExerciseConfigurationDto } from './dto/update-exercise-configuration.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { ExerciseConfiguration } from './entities/exercise-configuration.entity';

@Controller('exercise-configurations')
export class ExerciseConfigurationsController extends CoreController<
  ExerciseConfiguration,
  ExerciseConfigurationsService,
  CreateExerciseConfigurationDto,
  UpdateExerciseConfigurationDto
> {
  constructor(
    private readonly exerciseConfigurationsService: ExerciseConfigurationsService,
  ) {
    super(exerciseConfigurationsService);
  }

  @Patch('update-list')
  async updateListOfExerciseGroups(@Body() body: ExerciseConfiguration[]) {
    // Pegar todos os ExerciseConfiguration desse method-exercise
    const exMethodId = body[0].exerciseMethodId;
    const alreadyCreated: ExerciseConfiguration[] =
      await this.exerciseConfigurationsService.getExerciseConfigurationsByExerciseMethodId(
        exMethodId,
      );
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
    const d$ = deletedOnes.map((ec) =>
      this.exerciseConfigurationsService.remove(ec.id),
    );
    const d = await Promise.all(d$);

    return { new: n, deleted: d };
  }
}
