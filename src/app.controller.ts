import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './routes/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('abc')
  getHello2(): string {
    return this.appService.getHello2();
  }

  @Public()
  @Get('def')
  getHello3(): string {
    return this.appService.getHello3();
  }
}
