import { Module } from '@nestjs/common';
import { TrainingSheetService } from './training-sheet.service';
import { TrainingSheetController } from './training-sheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingSheet } from './entities/training-sheet.entity';
import { FileService } from 'src/core/services/File.service';
import { CustomCacheInterceptor } from 'src/core/inteceptors/cache.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingSheet])],
  controllers: [TrainingSheetController],
  providers: [TrainingSheetService, FileService, CustomCacheInterceptor],
})
export class TrainingSheetModule {}
