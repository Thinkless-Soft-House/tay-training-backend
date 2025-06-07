import { Module } from '@nestjs/common';
import { MenuCalculatorService } from './menu-calculator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuCalculatorController } from './menu-calculator.controller';
import { FileService } from 'src/core/services/File.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuCalculatorController],
  providers: [MenuCalculatorService, FileService],
})
export class MenuCalculatorModule {}
