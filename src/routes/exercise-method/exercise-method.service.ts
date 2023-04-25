import { Injectable } from '@nestjs/common';
import { CreateExerciseMethodDto } from './dto/create-exercise-method.dto';
import { UpdateExerciseMethodDto } from './dto/update-exercise-method.dto';

@Injectable()
export class ExerciseMethodService {
  create(createExerciseMethodDto: CreateExerciseMethodDto) {
    return 'This action adds a new exerciseMethod';
  }

  findAll() {
    return `This action returns all exerciseMethod`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseMethod`;
  }

  update(id: number, updateExerciseMethodDto: UpdateExerciseMethodDto) {
    return `This action updates a #${id} exerciseMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseMethod`;
  }
}
