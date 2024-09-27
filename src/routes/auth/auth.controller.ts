import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard, Public } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('register')
  async register(@Body() userDto) {
    return this.authService.register(userDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
