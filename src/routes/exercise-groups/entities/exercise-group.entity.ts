import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'exercise_groups' })
export class ExerciseGroup extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'category', type: 'text' })
  category: string;
}
