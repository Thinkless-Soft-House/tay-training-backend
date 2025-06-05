import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
export declare class UsersService extends CoreService<User> {
    constructor(trainingSheetRepository: Repository<User>);
    createWhere(query: any): {};
}
