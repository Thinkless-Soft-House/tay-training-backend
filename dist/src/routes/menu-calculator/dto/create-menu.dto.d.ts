import { ValidationOptions } from 'class-validator';
export declare enum ExerciseStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare function IsMaxCaloriesGreaterThanMin(validationOptions?: ValidationOptions): PropertyDecorator;
export declare class CreateMenuDto {
    name: string;
    description: string;
    pdfUrl: string;
    minCalories: number;
    maxCalories: number;
    status: ExerciseStatus;
}
