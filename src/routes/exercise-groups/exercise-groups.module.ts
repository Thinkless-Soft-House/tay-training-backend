import { Module } from '@nestjs/common';
import { ExerciseGroupsService } from './exercise-groups.service';
import { ExerciseGroupsController } from './exercise-groups.controller';

@Module({
  controllers: [ExerciseGroupsController],
  providers: [ExerciseGroupsService]
})
export class ExerciseGroupsModule {}
