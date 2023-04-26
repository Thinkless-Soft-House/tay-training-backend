import { IsBoolean, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  videoUrl: string;
  @IsBoolean()
  hasMethod: boolean;
}
