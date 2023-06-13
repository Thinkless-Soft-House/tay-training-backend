import { compareSync } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/routes/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userSearch = await this.usersService.findByFilter({
      email: username,
    });
    const user = userSearch[0];

    if (compareSync(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
