import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';
import { ErrorHandler } from 'src/core/handlers/error-handler.handler';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto) {
    try {
      // Create a new exercise
      const newExercise = this.exerciseRepository.create(createExerciseDto);

      // Save exercise in database
      await this.exerciseRepository.save(newExercise);
      return newExercise;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findAll() {
    try {
      // Create a new exercise
      return await this.exerciseRepository.find();
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findOne(id: number) {
    try {
      const exercise = await this.exerciseRepository.findOne({ where: { id } });
      console.log(exercise);

      return exercise;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    try {
      // Check if exercise exists
      const exercise = await this.exerciseRepository.findOne({
        where: { id },
      });

      if (!exercise) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }

      // Create a new exercise
      console.log(updateExerciseDto);
      const newExercise = this.exerciseRepository.create(updateExerciseDto);
      console.log(newExercise);
      // Save exercise in database
      await this.exerciseRepository.update(id, newExercise);

      // Get updated exercise
      return await this.exerciseRepository.findOne({ where: { id } });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  remove(id: number) {
    try {
      // Find exercise by id
      const exercise = this.exerciseRepository.findOne({ where: { id } });

      // Delete exercise
      this.exerciseRepository.delete(id);

      // Return deleted exercise
      return exercise;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }
}
