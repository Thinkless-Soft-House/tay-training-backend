import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseConfigurations } from './ExerciseConfigurations';

@Entity('exercises', { schema: 'public' })
export class Exercises {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', {
    name: 'video_url',
    nullable: true,
    length: 255,
  })
  videoUrl: string | null;

  @Column('boolean', { name: 'has_method', default: () => 'true' })
  hasMethod: boolean;

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

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @OneToMany(
    () => ExerciseConfigurations,
    (exerciseConfigurations) => exerciseConfigurations.exercise,
  )
  exerciseConfigurations: ExerciseConfigurations[];
}
