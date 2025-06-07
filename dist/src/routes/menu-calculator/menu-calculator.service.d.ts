import { FileService } from 'src/core/services/File.service';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
export declare class MenuCalculatorService extends CoreService<Menu> {
    private menuRepository;
    private fileService;
    constructor(menuRepository: Repository<Menu>, fileService: FileService);
    createWhere(query: any): {};
    findByCalories(calories: number): Promise<Menu>;
    create(createDto: any): Promise<any>;
    createWithFile(createDto: any, file: any): Promise<Menu[]>;
    updateWithFile(id: number, updateDto: any, file: any): Promise<Menu>;
    getFilePath(id: number): Promise<string>;
}
