import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'training_days' })
export class TrainingDay extends CoreEntity {
  // FK's
  @Column({ name: 'training_sheet_id' })
  trainingSheetId: number;

  @Column({ name: 'exercise_group_id' })
  exerciseGroupId: number;

  @Column({ name: 'day' })
  day: number;
}
