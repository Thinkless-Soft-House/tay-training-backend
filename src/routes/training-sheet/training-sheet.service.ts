import { Injectable } from '@nestjs/common';
import { TrainingSheet } from './entities/training-sheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreService } from 'src/core/utils/core-service.service';
import { ILike, Repository } from 'typeorm';
import slugify from 'slugify';
import { translateTypeORMError } from 'src/core/functions/typeorm.utils';

@Injectable()
export class TrainingSheetService extends CoreService<TrainingSheet> {
  constructor(
    @InjectRepository(TrainingSheet)
    trainingSheetRepository: Repository<TrainingSheet>,
  ) {
    super(trainingSheetRepository);
  }

  override createWhere(query: any) {
    const where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);

    return where;
  }

  override async create(createDto: any): Promise<TrainingSheet> {
    try {
      // Create a new item
      const data = {
        ...createDto,
        slug: slugify(createDto.name, { lower: true }),
      };
      const newItem: any = this.repository.create(data);

      // Save item in database and return it
      const create$ = await this.repository.save(newItem);

      // Create slug with id and name together
      const slug = slugify(`${create$.id}-${create$.name}`, {
        lower: true,
      });

      // Update item with slug
      await this.repository.update(create$.id, {
        slug,
      });

      return { ...create$, slug };
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }
}
