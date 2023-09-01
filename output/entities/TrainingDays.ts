import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseGroups } from './ExerciseGroups';
import { TrainingSheets } from './TrainingSheets';

@Entity('training_days', { schema: 'public' })
export class TrainingDays {
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

  @Column('integer', { name: 'day' })
  day: number;

  @ManyToOne(
    () => ExerciseGroups,
    (exerciseGroups) => exerciseGroups.trainingDays,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([{ name: 'exercise_group_id', referencedColumnName: 'id' }])
  exerciseGroup: ExerciseGroups;

  @ManyToOne(
    () => TrainingSheets,
    (trainingSheets) => trainingSheets.trainingDays,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([{ name: 'training_sheet_id', referencedColumnName: 'id' }])
  trainingSheet: TrainingSheets;
}
