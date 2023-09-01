import { CoreController } from 'src/core/utils/core-controller.controller';
import { MethodsService } from './methods.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { Method } from './entities/method.entity';
export declare class MethodsController extends CoreController<Method, MethodsService, CreateMethodDto, UpdateMethodDto> {
    private readonly methodsService;
    constructor(methodsService: MethodsService);
}
