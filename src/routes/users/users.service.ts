import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CoreService } from 'src/core/utils/core-service.service';

@Injectable()
export class UsersService extends CoreService<User> {
  constructor(
    @InjectRepository(User)
    trainingSheetRepository: Repository<User>,
  ) {
    super(trainingSheetRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);
    if (query.email) where['email'] = ILike(`%${query.email}%`);

    return where;
  }
}
