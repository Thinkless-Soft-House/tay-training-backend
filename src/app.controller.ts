import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './routes/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    console.log('getHello');
    return this.appService.getHello();
  }

  @Public()
  @Get('abc')
  getHello2(): string {
    console.log('getHello2');
    return this.appService.getHello2();
  }

  @Public()
  @Get('def')
  getHello3(): string {
    console.log('getHello3');
    return this.appService.getHello3();
  }

  @Public()
  @Get('env')
  getEnv(): Record<string, string | undefined> {
    return process.env;
  }
}
