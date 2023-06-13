import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
export declare class UsersController extends CoreController<User, UsersService, CreateUserDto, UpdateUserDto> {
    private readonly UserService;
    constructor(UserService: UsersService);
    create(createDto: CreateUserDto): Promise<User>;
}
