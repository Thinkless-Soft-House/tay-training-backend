import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseMethod } from 'src/routes/exercise-method/entities/exercise-method.entity';
import { TrainingDay } from 'src/routes/training-day/entities/training-day.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

@Entity({ name: 'exercise_groups' })
export class ExerciseGroup extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'category', type: 'text' })
  category: string;

  // FK's

  // Relations

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
