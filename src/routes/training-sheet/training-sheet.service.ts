import { Injectable } from '@nestjs/common';
import { TrainingSheet } from './entities/training-sheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TrainingSheetService extends CoreService<TrainingSheet> {
  constructor(
    @InjectRepository(TrainingSheet)
    trainingSheetRepository: Repository<TrainingSheet>,
  ) {
    super(trainingSheetRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);

    return where;
  }
}
