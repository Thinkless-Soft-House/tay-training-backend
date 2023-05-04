import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseGroupCategoriesController } from './exercise-group-categories.controller';
import { ExerciseGroupCategoriesService } from './exercise-group-categories.service';

describe('ExerciseGroupCategoriesController', () => {
  let controller: ExerciseGroupCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseGroupCategoriesController],
      providers: [ExerciseGroupCategoriesService],
    }).compile();

    controller = module.get<ExerciseGroupCategoriesController>(ExerciseGroupCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
