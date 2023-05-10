import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;
}
