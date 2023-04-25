import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDayController } from './training-day.controller';
import { TrainingDayService } from './training-day.service';

describe('TrainingDayController', () => {
  let controller: TrainingDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingDayController],
      providers: [TrainingDayService],
    }).compile();

    controller = module.get<TrainingDayController>(TrainingDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
