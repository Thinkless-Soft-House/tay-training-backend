import { Injectable } from '@nestjs/common';
import { Method } from './entities/method.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class MethodsService extends CoreService<Method> {
  constructor(
    @InjectRepository(Method)
    methodsRepository: Repository<Method>,
  ) {
    super(methodsRepository);
  }
}
