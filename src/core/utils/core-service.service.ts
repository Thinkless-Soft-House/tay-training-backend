import { ILike, Repository } from 'typeorm';
import { translateTypeORMError } from '../functions/typeorm.utils';
import { ErrorHandler } from '../handlers/error.handler';

export class CoreService<T> {
  constructor(public repository: Repository<T>) {}

  async create(createDto: any) {
    try {
      // Create a new item
      const newItem = this.repository.create(createDto);

      // Save item in database
      await this.repository.save(newItem);
      return newItem;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async createMany(items: any[]) {
    try {
      items.map(async (item) => {
        return this.create(item);
      });
      const res = await Promise.all(items);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw translateTypeORMError(error);
    }
  }

  async findByFilter(query: any) {
    console.log(query);
    const where = {};
    if (query.name) where['name'] = ILike(`%${query.name}%`);

    if (query.description)
      where['description'] = ILike(`%${query.description}%`);

    if (query.videoUrl) where['videoUrl'] = ILike(`%${query.videoUrl}%`);

    if (query.hasMethod) where['hasMethod'] = query.hasMethod;

    try {
      const results = await this.repository.findAndCount({
        where,
        relations: query.relations ? query.relations.split(',') : [],
        take: query.take,
        skip: query.skip,
        order: {
          [query.orderColumn || 'id']: query.order || 'ASC',
        },
      });

      return {
        data: results[0],
        count: results[1],
      };
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findAll(relations?: string[]) {
    try {
      // Create a new item
      const rel = relations ? relations : [];
      return await this.repository.find({
        relations: rel,
      });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findOne(id: number) {
    try {
      const whereId: any = { id };
      const item = await this.repository.findOne({ where: whereId });

      return item;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async update(id: number, updateDto: any) {
    try {
      // Check if item exists
      const whereId: any = { id };
      const item = await this.repository.findOne({
        where: whereId,
      });

      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }

      // Create a new item
      console.log(updateDto);
      const newItem: any = this.repository.create(updateDto);
      console.log(newItem);
      // Save item in database
      await this.repository.update(id, newItem);

      // Get updated item
      return await this.repository.findOne({ where: whereId });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async updateMany(items: { id: number; data: any }[]) {
    try {
      console.log('updateMany', items);
      items.map(async (item) => {
        return this.update(item.id, item.data);
      });

      return await Promise.all(items);
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async remove(id: number) {
    try {
      // Check if item exists
      const whereId: any = { id };
      const item = await this.repository.findOne({
        where: whereId,
      });

      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }

      // Delete item
      await this.repository.delete(id);
      return item;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }
}
