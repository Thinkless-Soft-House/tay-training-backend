import { Injectable } from '@nestjs/common';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { Method } from './entities/method.entity';
import { Repository } from 'typeorm';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from 'src/core/handlers/error-handler.handler';

@Injectable()
export class MethodsService {
  constructor(
    @InjectRepository(Method)
    private methodRepository: Repository<Method>,
  ) {}

  async create(createMethodDto: CreateMethodDto) {
    try {
      // Create a new method
      const newMethod = this.methodRepository.create(createMethodDto);

      // Save method in database
      await this.methodRepository.save(newMethod);
      return newMethod;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findAll() {
    try {
      // Create a new method
      return await this.methodRepository.find();
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findOne(id: number) {
    try {
      const method = await this.methodRepository.findOne({ where: { id } });
      console.log(method);

      return method;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async update(id: number, updateMethodDto: UpdateMethodDto) {
    try {
      // Check if method exists
      const method = await this.methodRepository.findOne({
        where: { id },
      });

      if (!method) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }

      // Create a new method
      console.log(updateMethodDto);
      const newMethod = this.methodRepository.create(updateMethodDto);
      console.log(newMethod);
      // Save method in database
      await this.methodRepository.update(id, newMethod);

      // Get updated method
      return await this.methodRepository.findOne({ where: { id } });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  remove(id: number) {
    try {
      // Find method by id
      const method = this.methodRepository.findOne({ where: { id } });

      // Delete method
      this.methodRepository.delete(id);

      // Return deleted method
      return method;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }
}
