import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Taytraining version 2.1!';
  }
  getHello2(): string {
    return 'Hello Taytraining 2!';
  }
  getHello3(): string {
    return 'Hello Taytraining 3!';
  }
}
