// import { compareSync } from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/routes/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // auth.service.ts

  async validateUser(username: string, pass: string): Promise<any> {
    const userSearch = await this.usersService.findByFilter({
      email: username,
    });
    const user = userSearch.data[0];
    // console.log('Usuário encontrado:', user);

    if (!user) {
      // Retorna um objeto de erro se o usuário não for encontrado
      return { error: 'Usuário não encontrado' };
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      // console.log('Senha correta. Usuário autenticado.');
      const { password, ...result } = user;
      return result;
    } else {
      // console.log('Senha incorreta. Autenticação falhou.');
      // Retorna um objeto de erro se a senha estiver incorreta
      return { error: 'Senha incorreta' };
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
    };
  }

  async register(userDto: CreateUserDto) {
    // Check if user exists
    const user = await this.usersService.findByFilter({ email: userDto.email });

    if (user.data.length > 0) {
      throw new BadRequestException('User already exists');
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(userDto.password, salt);

    const newUser = await this.usersService.create({
      ...userDto,
      password: passwordHash,
    });

    return newUser;
  }

  private hashPassword(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    return passwordHash;
  }
}
