import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercise_group_cateogories', { schema: 'public' })
export class ExerciseGroupCateogories {
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
}
