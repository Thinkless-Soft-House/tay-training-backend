import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'exercise_methods' })
export class ExerciseMethod extends CoreEntity {
  @Column({ type: 'varchar', length: 255 })
  type: string;

  // FK's
  @Column({ name: 'exercise_id', type: 'int' })
  exerciseId: number;

  @Column({ name: 'method_id', type: 'int' })
  methodId: number;
}
