import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseConfiguration } from 'src/routes/exercise-configurations/entities/exercise-configuration.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

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

  // FK's

  // Relations

  @OneToMany(
    () => ExerciseConfiguration,
    (exerciseConfiguration) => exerciseConfiguration.exercise,
    {},
  )
  exerciseConfigurations: Relation<ExerciseConfiguration[]>;
}
