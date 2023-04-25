import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseMethodService } from './exercise-method.service';

describe('ExerciseMethodService', () => {
  let service: ExerciseMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseMethodService],
    }).compile();

    service = module.get<ExerciseMethodService>(ExerciseMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
