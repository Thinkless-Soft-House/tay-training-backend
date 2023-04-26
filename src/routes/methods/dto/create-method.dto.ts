import { IsString } from 'class-validator';

export class CreateMethodDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
}
