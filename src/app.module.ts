import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './routes/exercises/exercises.module';
import { MethodsModule } from './routes/methods/methods.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseGroupsModule } from './routes/exercise-groups/exercise-groups.module';
import { ExerciseMethodModule } from './routes/exercise-method/exercise-method.module';
import { ExerciseConfigurationsModule } from './routes/exercise-configurations/exercise-configurations.module';
import { TrainingSheetModule } from './routes/training-sheet/training-sheet.module';
import { TrainingDayModule } from './routes/training-day/training-day.module';
import createOrmconfig from './core/database/ormconfig';

@Module({
  imports: [
    ExercisesModule,
    MethodsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => {
        const ormconfig = createOrmconfig({
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          synchronize: configService.get('TYPEORM_SYNC'),
        });
        return ormconfig;
      },
      inject: [ConfigService],
    }),
    ExerciseGroupsModule,
    ExerciseMethodModule,
    ExerciseConfigurationsModule,
    TrainingSheetModule,
    TrainingDayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
