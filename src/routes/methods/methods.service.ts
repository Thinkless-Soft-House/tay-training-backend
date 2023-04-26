import { Injectable } from '@nestjs/common';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { Method } from './entities/method.entity';
import { Repository } from 'typeorm';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MethodsService {
  constructor(
    @InjectRepository(Method)
    private exerciseRepository: Repository<Method>,
  ) {}

  async create(createMethodDto: CreateMethodDto) {
    try {
      // Create a new exercise
      const newMethod = this.exerciseRepository.create(createMethodDto);

      // Save exercise in database
      await this.exerciseRepository.save(newMethod);
      return newMethod;
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

  async update(id: number, updateMethodDto: UpdateMethodDto) {
    // Create a new exercise
    console.log(updateMethodDto);
    const newMethod = this.exerciseRepository.create(updateMethodDto);
    console.log(newMethod);
    // Save exercise in database
    await this.exerciseRepository.update(id, newMethod);

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
