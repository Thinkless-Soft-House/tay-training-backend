import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity('methods')
export class Method extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;
}
