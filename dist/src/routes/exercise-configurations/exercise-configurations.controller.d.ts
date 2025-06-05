import { ExerciseConfigurationsService } from './exercise-configurations.service';
import { CreateExerciseConfigurationDto } from './dto/create-exercise-configuration.dto';
import { UpdateExerciseConfigurationDto } from './dto/update-exercise-configuration.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { ExerciseConfiguration } from './entities/exercise-configuration.entity';
export declare class ExerciseConfigurationsController extends CoreController<ExerciseConfiguration, ExerciseConfigurationsService, CreateExerciseConfigurationDto, UpdateExerciseConfigurationDto> {
    private readonly exerciseConfigurationsService;
    constructor(exerciseConfigurationsService: ExerciseConfigurationsService);
    updateListOfExerciseGroups(body: ExerciseConfiguration[]): Promise<{
        new: number;
        deleted: number;
        updated: number;
    }>;
}
