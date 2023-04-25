import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDayService } from './training-day.service';

describe('TrainingDayService', () => {
  let service: TrainingDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingDayService],
    }).compile();

    service = module.get<TrainingDayService>(TrainingDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
