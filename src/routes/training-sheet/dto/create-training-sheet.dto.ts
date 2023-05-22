import { IsOptional, IsString } from 'class-validator';

export class CreateTrainingSheetDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  publicName: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  offlinePdf: string;

  @IsOptional()
  @IsString()
  newTabPdf: string;
}
