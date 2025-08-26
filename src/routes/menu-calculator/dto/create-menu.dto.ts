import {
  IsEnum,
  IsString,
  IsNumber,
  Min,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

export enum ExerciseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export function IsMaxCaloriesGreaterThanMin(
  validationOptions?: ValidationOptions,
) {
  return ValidateBy(
    {
      name: 'isMaxCaloriesGreaterThanMin',
      validator: {
        validate: (value: any, args: any) => {
          // debug removed: validation logs
          const object = args.object as CreateMenuDto;
          const isValid = object.minCalories <= object.maxCalories;
          return isValid;
        },
        defaultMessage: () =>
          'Calorias máximas devem ser maiores ou igual as mínimas',
      },
    },
    validationOptions,
  );
}

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  pdfUrl: string;

  @IsNumber()
  @Min(1, { message: 'Minimo de calorias deve ser maior do que 1' })
  minCalories: number;

  @IsNumber()
  @Min(1, { message: 'Maximo de calorias deve ser maior do que 1' })
  @IsMaxCaloriesGreaterThanMin({
    message: 'Calorias máximas devem ser maiores ou igual as mínimas',
  })
  maxCalories: number;

  @IsEnum(ExerciseStatus)
  status: ExerciseStatus;
}
