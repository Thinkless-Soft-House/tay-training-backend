import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;
  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;
  @Column({ name: 'password', type: 'text' })
  password: string;

  @Column({
    name: 'codeToRecovery',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  codeToRecovery: string;
}
