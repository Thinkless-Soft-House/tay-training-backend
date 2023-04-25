import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseGroupsService } from './exercise-groups.service';

describe('ExerciseGroupsService', () => {
  let service: ExerciseGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseGroupsService],
    }).compile();

    service = module.get<ExerciseGroupsService>(ExerciseGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
