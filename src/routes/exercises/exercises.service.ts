import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class ExercisesService extends CoreService<Exercise> {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {
    super(exerciseRepository);
  }
}
