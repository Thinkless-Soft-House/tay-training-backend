import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('getHello');
    return this.appService.getHello();
  }

  @Get('abc')
  getHello2(): string {
    console.log('getHello2');
    return this.appService.getHello2();
  }

  @Get('def')
  getHello3(): string {
    console.log('getHello3');
    return this.appService.getHello3();
  }
}
