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
    let where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);

    if (query.description)
      where['description'] = ILike(`%${query.description}%`);

    if (query.filter) {
      const aux = where;
      where = [
        { ...aux, name: ILike(`%${query.filter}%`) },
        { ...aux, description: ILike(`%${query.filter}%`) },
      ];
    }

    return where;
  }
}
