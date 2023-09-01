import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseGroupCategories } from './ExerciseGroupCategories';
import { ExerciseMethods } from './ExerciseMethods';
import { TrainingDays } from './TrainingDays';

@Entity('exercise_groups', { schema: 'public' })
export class ExerciseGroups {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', {
    name: 'publicName',
    nullable: true,
    length: 255,
  })
  publicName: string | null;

  @ManyToOne(
    () => ExerciseGroupCategories,
    (exerciseGroupCategories) => exerciseGroupCategories.exerciseGroups,
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: ExerciseGroupCategories;

  @OneToMany(
    () => ExerciseMethods,
    (exerciseMethods) => exerciseMethods.exerciseGroup,
  )
  exerciseMethods: ExerciseMethods[];

  @OneToMany(() => TrainingDays, (trainingDays) => trainingDays.exerciseGroup)
  trainingDays: TrainingDays[];
}
