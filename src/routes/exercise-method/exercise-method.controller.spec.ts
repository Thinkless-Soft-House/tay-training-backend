import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseMethodController } from './exercise-method.controller';
import { ExerciseMethodService } from './exercise-method.service';

describe('ExerciseMethodController', () => {
  let controller: ExerciseMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseMethodController],
      providers: [ExerciseMethodService],
    }).compile();

    controller = module.get<ExerciseMethodController>(ExerciseMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
