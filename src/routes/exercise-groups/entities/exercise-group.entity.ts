import { ExerciseGroupCategory } from 'src/routes/exercise-group-categories/entities/exercise-group-category.entity';
import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseMethod } from 'src/routes/exercise-method/entities/exercise-method.entity';
import { TrainingDay } from 'src/routes/training-day/entities/training-day.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity({ name: 'exercise_groups' })
export class ExerciseGroup extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'category_id', type: 'text' })
  category_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicName: string;

  // FK's

  // Relations

  @ManyToOne(
    () => ExerciseGroupCategory,
    (exerciseGroupCategory: ExerciseGroupCategory) =>
      exerciseGroupCategory.exerciseGroups,
    {},
  )
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Relation<ExerciseGroupCategory>;

  @OneToMany(
    () => ExerciseMethod,
    (exerciseMethod: ExerciseMethod) => exerciseMethod.exerciseGroup,
    {},
  )
  exerciseMethods: Relation<ExerciseMethod[]>;

  @OneToMany(
    () => TrainingDay,
    (trainingDay: TrainingDay) => trainingDay.exerciseGroup,
    {},
  )
  trainingDays: Relation<TrainingDay[]>;
}
