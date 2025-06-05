import { Controller, UsePipes, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { MenuCalculatorService } from './menu-calculator.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { CoreControllerV2 } from 'src/core/utils/core-controller-v2.controller';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { Public } from '../auth/public.decorator';

@Controller('menu-calculator')
@UsePipes(new ValidationPipe())
export class MenuCalculatorController extends CoreControllerV2<
  Menu,
  MenuCalculatorService,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor(private readonly menuCalculatorService: MenuCalculatorService) {
    super(menuCalculatorService, CreateMenuDto, UpdateMenuDto);
  }

  @Public()
  @Get('find-by-calories/:calories')
  async findByCalories(@Param('calories', ParseIntPipe) calories: number) {
    return this.menuCalculatorService.findByCalories(Number(calories));
  }
}
