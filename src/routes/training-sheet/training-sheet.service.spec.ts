import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSheetService } from './training-sheet.service';

describe('TrainingSheetService', () => {
  let service: TrainingSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingSheetService],
    }).compile();

    service = module.get<TrainingSheetService>(TrainingSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
