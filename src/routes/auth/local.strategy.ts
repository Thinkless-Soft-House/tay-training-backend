// local.strategy.ts

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  Dependencies,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string) {
    const result = await this.authService.validateUser(username, password);
    // console.log('result', result);
    if (result && result.error) {
      // Lança uma exceção com a mensagem de erro específica
      console.error(result.error);
      throw new UnauthorizedException(result.error);
    }

    return result;
  }
}
