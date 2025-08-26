import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainingAccessDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  trainingId: string;
}
