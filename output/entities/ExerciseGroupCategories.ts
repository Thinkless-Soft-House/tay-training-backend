import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseGroups } from './ExerciseGroups';

@Entity('exercise_group_categories', { schema: 'public' })
export class ExerciseGroupCategories {
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

  @OneToMany(() => ExerciseGroups, (exerciseGroups) => exerciseGroups.category)
  exerciseGroups: ExerciseGroups[];
}
