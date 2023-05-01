import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseGroup } from 'src/routes/exercise-groups/entities/exercise-group.entity';
import { TrainingSheet } from 'src/routes/training-sheet/entities/training-sheet.entity';
import { Relation } from 'typeorm';
export declare class TrainingDay extends CoreEntity {
    day: number;
    trainingSheetId: number;
    exerciseGroupId: number;
    trainingSheet: Relation<TrainingSheet>;
    exerciseGroup: Relation<ExerciseGroup>;
}
