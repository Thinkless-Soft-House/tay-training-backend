import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseGroupCategoriesService } from './exercise-group-categories.service';

describe('ExerciseGroupCategoriesService', () => {
  let service: ExerciseGroupCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseGroupCategoriesService],
    }).compile();

    service = module.get<ExerciseGroupCategoriesService>(ExerciseGroupCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
