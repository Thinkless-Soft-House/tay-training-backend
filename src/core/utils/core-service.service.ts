import { Repository } from 'typeorm';
import { translateTypeORMError } from '../functions/typeorm.utils';
import { ErrorHandler } from '../handlers/error-handler.handler';

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
