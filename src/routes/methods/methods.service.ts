import { Injectable } from '@nestjs/common';
import { Method } from './entities/method.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class MethodsService extends CoreService<Method> {
  constructor(
    @InjectRepository(Method)
    private methodsRepository: Repository<Method>,
  ) {
    super(methodsRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);

    if (query.description)
      where['description'] = ILike(`%${query.description}%`);

    return where;
  }
}
