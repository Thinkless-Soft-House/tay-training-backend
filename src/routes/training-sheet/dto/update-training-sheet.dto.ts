import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingSheetDto } from './create-training-sheet.dto';

export class UpdateTrainingSheetDto extends PartialType(CreateTrainingSheetDto) {}
