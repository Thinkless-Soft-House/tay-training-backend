import { Module } from '@nestjs/common';
import { ExerciseConfigurationsService } from './exercise-configurations.service';
import { ExerciseConfigurationsController } from './exercise-configurations.controller';

@Module({
  controllers: [ExerciseConfigurationsController],
  providers: [ExerciseConfigurationsService]
})
export class ExerciseConfigurationsModule {}
