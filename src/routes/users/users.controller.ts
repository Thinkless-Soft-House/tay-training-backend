import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';

@Controller('users')
export class UsersController extends CoreController<
  User,
  UsersService,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly UserService: UsersService) {
    super(UserService);
  }
}
