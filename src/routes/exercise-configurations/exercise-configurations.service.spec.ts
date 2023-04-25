import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseConfigurationsService } from './exercise-configurations.service';

describe('ExerciseConfigurationsService', () => {
  let service: ExerciseConfigurationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseConfigurationsService],
    }).compile();

    service = module.get<ExerciseConfigurationsService>(ExerciseConfigurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
