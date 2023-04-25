import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSheetController } from './training-sheet.controller';
import { TrainingSheetService } from './training-sheet.service';

describe('TrainingSheetController', () => {
  let controller: TrainingSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingSheetController],
      providers: [TrainingSheetService],
    }).compile();

    controller = module.get<TrainingSheetController>(TrainingSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
