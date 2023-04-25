import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseGroupsController } from './exercise-groups.controller';
import { ExerciseGroupsService } from './exercise-groups.service';

describe('ExerciseGroupsController', () => {
  let controller: ExerciseGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseGroupsController],
      providers: [ExerciseGroupsService],
    }).compile();

    controller = module.get<ExerciseGroupsController>(ExerciseGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
