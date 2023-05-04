import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseGroup } from 'src/routes/exercise-groups/entities/exercise-group.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

@Entity({ name: 'exercise_group_categories' })
export class ExerciseGroupCategory extends CoreEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // Relations

  @OneToMany(
    () => ExerciseGroup,
    (exerciseGroup: ExerciseGroup) => exerciseGroup.category,
    { onDelete: 'CASCADE' },
  )
  exerciseGroups: Relation<ExerciseGroup[]>;
}
