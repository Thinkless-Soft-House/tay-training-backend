import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseConfigurationDto } from './create-exercise-configuration.dto';

export class UpdateExerciseConfigurationDto extends PartialType(CreateExerciseConfigurationDto) {}
