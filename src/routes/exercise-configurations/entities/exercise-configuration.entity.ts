import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'exercise_configurations' })
export class ExerciseConfiguration extends CoreEntity {
  @Column({ type: 'varchar', length: 255 })
  series: string;

  @Column({ name: 'repetitions', type: 'varchar', length: 255 })
  reps: string;

  @Column({ type: 'varchar', length: 255 })
  rest: string;

  // FK's
  @Column({ name: 'exercise_group_id' })
  exerciseGroupId: number;

  @Column({ name: 'exercise_id' })
  exerciseId: number;
}
