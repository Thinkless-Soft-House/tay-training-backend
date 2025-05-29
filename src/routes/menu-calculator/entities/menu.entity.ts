import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

export enum ExerciseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('menus')
export class Menu extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'pdf_url', type: 'varchar', length: 500 })
  pdfUrl: string;

  @Column({ name: 'min_calories', type: 'int', nullable: true })
  minCalories: number;

  @Column({ name: 'max_calories', type: 'int', nullable: true })
  maxCalories: number;

  @Column({ 
    name: 'status', 
    type: 'enum', 
    enum: ExerciseStatus,
    default: ExerciseStatus.ACTIVE 
  })
  status: ExerciseStatus;
}
