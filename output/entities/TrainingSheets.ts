import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrainingDays } from './TrainingDays';

@Entity('training_sheets', { schema: 'public' })
export class TrainingSheets {
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

  @Column('character varying', {
    name: 'publicName',
    nullable: true,
    length: 255,
  })
  publicName: string | null;

  @Column('character varying', { name: 'slug', nullable: true, length: 255 })
  slug: string | null;

  @Column('character varying', {
    name: 'offlinePdf',
    nullable: true,
    length: 255,
  })
  offlinePdf: string | null;

  @Column('character varying', {
    name: 'newTabPdf',
    nullable: true,
    length: 255,
  })
  newTabPdf: string | null;

  @Column('character varying', { name: 'pdfPath', nullable: true, length: 255 })
  pdfPath: string | null;

  @OneToMany(() => TrainingDays, (trainingDays) => trainingDays.trainingSheet)
  trainingDays: TrainingDays[];
}
