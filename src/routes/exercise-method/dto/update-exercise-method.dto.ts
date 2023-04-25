import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseMethodDto } from './create-exercise-method.dto';

export class UpdateExerciseMethodDto extends PartialType(CreateExerciseMethodDto) {}
