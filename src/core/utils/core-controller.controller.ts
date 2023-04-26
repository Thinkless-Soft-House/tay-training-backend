import { Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ErrorHandler } from '../handlers/error-handler.handler';

interface HasId {
  id: number;
}

interface IsService {
  create(createDto: any): Promise<any>;
  findAll(): Promise<any>;
  findOne(id: number): Promise<any>;
  update(id: number, updateDto: any): Promise<any>;
  remove(id: number): Promise<any>;
}

export class CoreController<
  Entity extends HasId,
  Service extends IsService,
  CreateDTO,
  UpdateDTO,
> {
  constructor(public service: Service) {}

  @Post()
  async create(@Body() createDto: CreateDTO) {
    try {
      const create$: Entity = await this.service.create(createDto);
      return create$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Get()
  async findAll(): Promise<Entity[]> {
    try {
      return this.service.findAll();
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const item: Entity | null = await this.service.findOne(+id);
      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }
      return item;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDTO) {
    try {
      const update$: Entity = await this.service.update(+id, updateDto);
      return update$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const remove$: Entity = await this.service.remove(+id);
      return remove$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
