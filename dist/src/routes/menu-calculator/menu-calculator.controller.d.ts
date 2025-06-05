import { MenuCalculatorService } from './menu-calculator.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { CoreControllerV2 } from 'src/core/utils/core-controller-v2.controller';
export declare class MenuCalculatorController extends CoreControllerV2<Menu, MenuCalculatorService, CreateMenuDto, UpdateMenuDto> {
    private readonly menuCalculatorService;
    constructor(menuCalculatorService: MenuCalculatorService);
    findByCalories(calories: number): Promise<Menu>;
}
