import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHello2(): string {
    return 'Hello World 2!';
  }
  getHello3(): string {
    return 'Hello World 3!';
  }
}
