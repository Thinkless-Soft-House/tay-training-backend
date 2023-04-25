import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseConfigurationsController } from './exercise-configurations.controller';
import { ExerciseConfigurationsService } from './exercise-configurations.service';

describe('ExerciseConfigurationsController', () => {
  let controller: ExerciseConfigurationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseConfigurationsController],
      providers: [ExerciseConfigurationsService],
    }).compile();

    controller = module.get<ExerciseConfigurationsController>(ExerciseConfigurationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
