import { Injectable } from '@nestjs/common';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { Method } from './entities/method.entity';
import { Repository } from 'typeorm';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandler } from 'src/core/handlers/error-handler.handler';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class MethodsService extends CoreService<Method> {
  constructor(
    @InjectRepository(Method)
    private methodsRepository: Repository<Method>,
  ) {
    super(methodsRepository);
  }
}
