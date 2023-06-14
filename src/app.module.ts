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
import { ExerciseGroupCategoriesModule } from './routes/exercise-group-categories/exercise-group-categories.module';
import { UsersModule } from './routes/users/users.module';
import { AuthModule } from './routes/auth/auth.module';
import createOrmconfig from './core/database/ormconfig';

@Module({
  imports: [
    ExercisesModule,
    MethodsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : process.env.NODE_ENV === 'internal-docker'
          ? '.env.internal-docker'
          : '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => {
        const ormconfig = createOrmconfig({
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
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
    ExerciseGroupCategoriesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
