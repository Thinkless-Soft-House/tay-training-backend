import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'exercises' })
export class Exercise extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'video_url', type: 'varchar', length: 255 })
  videoUrl: string;

  @Column({ name: 'has_method', type: 'boolean', default: true })
  hasMethod: boolean;

  // Exercise Configuration FK
  // @Column({ name: 'exercise_configuration_id', type: 'int', nullable: true })
  // exerciseConfigurationId: number;
}
