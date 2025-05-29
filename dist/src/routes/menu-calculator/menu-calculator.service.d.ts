import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
export declare class MenuCalculatorService extends CoreService<Menu> {
    private menuRepository;
    constructor(menuRepository: Repository<Menu>);
    createWhere(query: any): {};
    findByCalories(calories: number): Promise<Menu>;
}
