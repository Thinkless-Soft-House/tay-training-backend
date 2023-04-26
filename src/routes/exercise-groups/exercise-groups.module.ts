import { Module } from '@nestjs/common';
import { ExerciseGroupsService } from './exercise-groups.service';
import { ExerciseGroupsController } from './exercise-groups.controller';
import { ExerciseGroup } from './entities/exercise-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseGroup])],
  controllers: [ExerciseGroupsController],
  providers: [ExerciseGroupsService],
})
export class ExerciseGroupsModule {}
