import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseGroup } from 'src/routes/exercise-groups/entities/exercise-group.entity';
import { TrainingSheet } from 'src/routes/training-sheet/entities/training-sheet.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

@Entity({ name: 'training_days' })
export class TrainingDay extends CoreEntity {
  @Column({ name: 'day' })
  day: number;

  // FK's
  @Column({ name: 'training_sheet_id' })
  trainingSheetId: number;

  @Column({ name: 'exercise_group_id' })
  exerciseGroupId: number;

  @Column({ name: 'short_name', nullable: true })
  shortName: string;

  // Relations

  @ManyToOne(
    () => TrainingSheet,
    (trainingSheet: TrainingSheet) => trainingSheet.trainingDays,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'training_sheet_id', referencedColumnName: 'id' })
  trainingSheet: Relation<TrainingSheet>;

  @ManyToOne(
    () => ExerciseGroup,
    (exerciseGroup: ExerciseGroup) => exerciseGroup.trainingDays,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'exercise_group_id', referencedColumnName: 'id' })
  exerciseGroup: Relation<ExerciseGroup>;
}
