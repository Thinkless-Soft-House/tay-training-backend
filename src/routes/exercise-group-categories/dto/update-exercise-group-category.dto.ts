import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseGroupCategoryDto } from './create-exercise-group-category.dto';

export class UpdateExerciseGroupCategoryDto extends PartialType(CreateExerciseGroupCategoryDto) {}
