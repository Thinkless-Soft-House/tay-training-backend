import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercises } from './Exercises';
import { ExerciseMethods } from './ExerciseMethods';
import { Methods } from './Methods';

@Entity('exercise_configurations', { schema: 'public' })
export class ExerciseConfigurations {
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

  @Column('character varying', { name: 'series', length: 255 })
  series: string;

  @Column('character varying', { name: 'repetitions', length: 255 })
  repetitions: string;

  @ManyToOne(() => Exercises, (exercises) => exercises.exerciseConfigurations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'exercise_id', referencedColumnName: 'id' }])
  exercise: Exercises;

  @ManyToOne(
    () => ExerciseMethods,
    (exerciseMethods) => exerciseMethods.exerciseConfigurations,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([{ name: 'exercise_method_id', referencedColumnName: 'id' }])
  exerciseMethod: ExerciseMethods;

  @ManyToOne(() => Methods, (methods) => methods.exerciseConfigurations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'method_id', referencedColumnName: 'id' }])
  method: Methods;
}
