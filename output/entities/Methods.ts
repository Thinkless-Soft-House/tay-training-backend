import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseConfigurations } from './ExerciseConfigurations';

@Entity('methods', { schema: 'public' })
export class Methods {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

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

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'description' })
  description: string;

  @OneToMany(
    () => ExerciseConfigurations,
    (exerciseConfigurations) => exerciseConfigurations.method,
  )
  exerciseConfigurations: ExerciseConfigurations[];
}
