import { ExerciseConfiguration } from './../../exercise-configurations/entities/exercise-configuration.entity';
import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseGroup } from 'src/routes/exercise-groups/entities/exercise-group.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity({ name: 'exercise_methods' })
export class ExerciseMethod extends CoreEntity {
  @Column({ type: 'varchar', length: 255 })
  type: string;

  // FK's

  @Column({ name: 'exercise_group_id', type: 'int' })
  exerciseGroupId: number;

  // Relations

  @ManyToOne(
    () => ExerciseGroup,
    (exerciseGroup: ExerciseGroup) => exerciseGroup.exerciseMethods,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'exercise_group_id', referencedColumnName: 'id' })
  exerciseGroup: Relation<ExerciseGroup>;

  @OneToMany(
    () => ExerciseConfiguration,
    (exerciseConfiguration: ExerciseConfiguration) =>
      exerciseConfiguration.exerciseMethod,
    {},
  )
  exerciseConfigurations: Relation<ExerciseConfiguration[]>;

  // @ManyToOne(() => Method, (method: Method) => method.exerciseMethods)
  // @JoinColumn({ name: 'method_id', referencedColumnName: 'id' })
  // method: Relation<Method>;
}
