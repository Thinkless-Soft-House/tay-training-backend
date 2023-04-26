import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';

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
    return await this.exerciseRepository.find();
  }

  async findOne(id: number) {
    const exercise = await this.exerciseRepository.findOne({ where: { id } });
    console.log(exercise);

    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    // Create a new exercise
    console.log(updateExerciseDto);
    const newExercise = this.exerciseRepository.create(updateExerciseDto);
    console.log(newExercise);
    // Save exercise in database
    await this.exerciseRepository.update(id, newExercise);

    // Get updated exercise
    return await this.exerciseRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    // Find exercise by id
    const exercise = this.exerciseRepository.findOne({ where: { id } });

    // Delete exercise
    this.exerciseRepository.delete(id);

    // Return deleted exercise
    return exercise;
  }
}
