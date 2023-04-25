import { Injectable } from '@nestjs/common';
import { CreateTrainingSheetDto } from './dto/create-training-sheet.dto';
import { UpdateTrainingSheetDto } from './dto/update-training-sheet.dto';

@Injectable()
export class TrainingSheetService {
  create(createTrainingSheetDto: CreateTrainingSheetDto) {
    return 'This action adds a new trainingSheet';
  }

  findAll() {
    return `This action returns all trainingSheet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingSheet`;
  }

  update(id: number, updateTrainingSheetDto: UpdateTrainingSheetDto) {
    return `This action updates a #${id} trainingSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingSheet`;
  }
}
