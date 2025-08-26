import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('training_access')
export class TrainingAccess {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  clientId: string;

  @Column({ length: 200 })
  trainingId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
