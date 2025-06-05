import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { ErrorHandler } from 'src/core/handlers/error.handler';

import * as bcrypt from 'bcrypt';

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
      const encryptedPassword = await this.createHash(createDto.password);

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

  async createHash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    // console.log('hash', passwordHash);
    return passwordHash;
  }
}
