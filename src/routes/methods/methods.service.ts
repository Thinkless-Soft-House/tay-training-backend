import { Injectable } from '@nestjs/common';
import { Method } from './entities/method.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';

@Injectable()
export class MethodsService extends CoreService<Method> {
  constructor(
    @InjectRepository(Method)
    private methodsRepository: Repository<Method>,
  ) {
    super(methodsRepository);
  }
}
