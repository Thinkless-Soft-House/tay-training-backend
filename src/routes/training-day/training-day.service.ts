import { Injectable } from '@nestjs/common';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';

@Injectable()
export class TrainingDayService {
  create(createTrainingDayDto: CreateTrainingDayDto) {
    return 'This action adds a new trainingDay';
  }

  findAll() {
    return `This action returns all trainingDay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingDay`;
  }

  update(id: number, updateTrainingDayDto: UpdateTrainingDayDto) {
    return `This action updates a #${id} trainingDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingDay`;
  }
}
