import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { ErrorHandler } from 'src/core/handlers/error.handler';

import { hashSync } from 'bcryptjs';

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

  @Post()
  async create(@Body() createDto: CreateUserDto) {
    try {
      const encryptedPassword = hashSync(createDto.password, 10);

      // Criar um novo objeto de usuário com a senha criptografada
      const newUser = {
        ...createDto,
        password: encryptedPassword,
      };

      const create$: User = await this.service.create(newUser);
      return create$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
