import { Module } from '@nestjs/common';
import { ExerciseConfigurationsService } from './exercise-configurations.service';
import { ExerciseConfigurationsController } from './exercise-configurations.controller';
import { ExerciseConfiguration } from './entities/exercise-configuration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseConfiguration])],
  controllers: [ExerciseConfigurationsController],
  providers: [ExerciseConfigurationsService],
})
export class ExerciseConfigurationsModule {}
