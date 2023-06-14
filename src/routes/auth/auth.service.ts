// import { compareSync } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/routes/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userSearch = await this.usersService.findByFilter({
      email: username,
    });
    const user = userSearch.data[0];
    console.log('user founded', user);

    if (!user) {
      return null;
    }

    if (bcrypt.compare(user.password, pass)) {
      console.log('password match');
      const { password, ...result } = user;
      return result;
    } else {
      console.log('password not match');
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
