import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseConfigurations } from './ExerciseConfigurations';
import { ExerciseGroups } from './ExerciseGroups';

@Entity('exercise_methods', { schema: 'public' })
export class ExerciseMethods {
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

  @Column('character varying', { name: 'rest', length: 255 })
  rest: string;

  @Column('character varying', { name: 'observations', nullable: true })
  observations: string | null;

  @Column('integer', { name: 'order', nullable: true })
  order: number | null;

  @OneToMany(
    () => ExerciseConfigurations,
    (exerciseConfigurations) => exerciseConfigurations.exerciseMethod,
  )
  exerciseConfigurations: ExerciseConfigurations[];

  @ManyToOne(
    () => ExerciseGroups,
    (exerciseGroups) => exerciseGroups.exerciseMethods,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([{ name: 'exercise_group_id', referencedColumnName: 'id' }])
  exerciseGroup: ExerciseGroups;
}
