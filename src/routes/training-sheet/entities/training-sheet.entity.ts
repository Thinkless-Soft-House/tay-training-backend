import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'training_sheets' })
export class TrainingSheet extends CoreEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;
}
