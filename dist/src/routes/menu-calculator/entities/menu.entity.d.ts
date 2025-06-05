import { CoreEntity } from 'src/core/models/CoreEntity.model';
export declare enum ExerciseStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare class Menu extends CoreEntity {
    name: string;
    description: string;
    pdfUrl: string;
    minCalories: number;
    maxCalories: number;
    status: ExerciseStatus;
}
