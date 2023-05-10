import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { ExerciseConfiguration } from 'src/routes/exercise-configurations/entities/exercise-configuration.entity';
import { ExerciseMethod } from 'src/routes/exercise-method/entities/exercise-method.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

@Entity('methods')
export class Method extends CoreEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  // FK's

  // Relations

  @OneToMany(
    () => ExerciseMethod,
    (exerciseMethod) => exerciseMethod.method,
    {},
  )
  exerciseConfigurations: Relation<ExerciseMethod[]>;

  // @OneToMany(
  //   () => ExerciseMethod,
  //   (exerciseMethod: ExerciseMethod) => exerciseMethod.method,
  //   {},
  // )
  // exerciseMethods: Relation<ExerciseMethod[]>;
}
