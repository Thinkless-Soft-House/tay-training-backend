import { Method } from './entities/method.entity';
import { Repository } from 'typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
export declare class MethodsService extends CoreService<Method> {
    private methodsRepository;
    constructor(methodsRepository: Repository<Method>);
    createWhere(query: any): {};
}
