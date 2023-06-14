import { Injectable } from '@nestjs/common';
import { ExerciseConfiguration } from './entities/exercise-configuration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { QueryRunner, Repository } from 'typeorm';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';

@Injectable()
export class ExerciseConfigurationsService extends CoreService<ExerciseConfiguration> {
  constructor(
    @InjectRepository(ExerciseConfiguration)
    methodsRepository: Repository<ExerciseConfiguration>,
  ) {
    super(methodsRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.series) where['series'] = query.series;
    if (query.reps) where['reps'] = query.reps;
    if (query.rest) where['rest'] = query.rest;
    if (query.exerciseMethodId)
      where['exerciseMethodId'] = query.exerciseMethodId;
    if (query.exerciseId) where['exerciseId'] = query.exerciseId;
    if (query.methodId) where['methodId'] = query.methodId;

    return where;
  }

  getExerciseConfigurationsByExerciseMethodId(exerciseMethodId: number) {
    return this.repository.find({
      where: { exerciseMethodId },
    });
  }

  async updateListOfExerciseGroups(body: ExerciseConfiguration[]) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const exMethodId = body[0].exerciseMethodId;
      const alreadyCreated: ExerciseConfiguration[] =
        await this.getExerciseConfigurationsByExerciseMethodId(exMethodId);

      const newOnes = body.filter(
        (ec) => !ec.id || !alreadyCreated.includes(ec),
      );
      const deletedOnes = alreadyCreated.filter(
        (ec) => !body.some((b) => b.id && b.id === ec.id),
      );
      const updatedOnes = body.filter(
        (ec) => ec.id && alreadyCreated.some((ac) => ac.id === ec.id),
      );
      let n: number;
      let d: number;
      let u: number;

      if (newOnes.length > 0) {
        n = await this.createManyQueryRunner(queryRunner, newOnes);
      }
      console.log('newOnes', newOnes);

      if (deletedOnes.length > 0) {
        d = await this.deleteManyQueryRunner(queryRunner, deletedOnes);
      }
      console.log('deletedOnes', deletedOnes);

      if (updatedOnes.length > 0) {
        u = await this.updateManyQueryRunner(queryRunner, updatedOnes);
      }
      console.log('updatedOnes', updatedOnes);

      await new Promise((resolve) => setTimeout(resolve, 100));

      await queryRunner.commitTransaction();

      return { new: n, deleted: d, updated: u };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createManyQueryRunner(queryRunner: QueryRunner, items: any[]) {
    try {
      const entities = items.map((item) => this.repository.create(item));

      const createdItems = [];
      for (const entity of entities) {
        await queryRunner.manager.save(entity); // Salvar uma entidade por vez usando o QueryRunner fornecido
        await new Promise((resolve) => setTimeout(resolve, 100));
        createdItems.push(entity);
      }

      return createdItems.length;
    } catch (error) {
      console.log(error);
      throw translateTypeORMError(error);
    }
  }

  async deleteManyQueryRunner(queryRunner: QueryRunner, items: any[]) {
    try {
      const deletedIds = items.map((item) => item.id);

      const deleteResult = [];
      for (const entity of deletedIds) {
        await queryRunner.manager.delete(this.repository.target, entity);
        await new Promise((resolve) => setTimeout(resolve, 100));
        deleteResult.push(entity);
      }

      return deleteResult.length;
    } catch (error) {
      console.log(error);
      throw translateTypeORMError(error);
    }
  }

  async updateManyQueryRunner(queryRunner: QueryRunner, items: any[]) {
    try {
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const entity = await this.repository.preload(item);
          if (entity) {
            return queryRunner.manager.save(entity);
          }
        }),
      );
      return updatedItems.filter((item) => item !== undefined).length;
    } catch (error) {
      console.log(error);
      throw translateTypeORMError(error);
    }
  }
}
