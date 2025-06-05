import { Module } from '@nestjs/common';
import { MenuCalculatorService } from './menu-calculator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuCalculatorController } from './menu-calculator.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuCalculatorController],
  providers: [MenuCalculatorService],
})
export class MenuCalculatorModule {}
