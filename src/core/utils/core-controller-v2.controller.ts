import { Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
import { ErrorHandler } from '../handlers/error.handler';
import { createPaginationConfig } from '../handlers/pagination.handler';
import { ValidationConfig } from '../../shared/config/validation.config';

interface HasId {
  id: number;
}

interface IsService {
  create(createDto: any): Promise<any>;
  createMany(items: any[]): Promise<any>;
  findAll(relations?: string[]): Promise<any>;
  findByFilter(query: any): Promise<any>;
  findOne(id: number, relations?: string[]): Promise<any>;
  update(id: number, updateDto: any): Promise<any>;
  updateMany(items: { id: number; data: any }[]): Promise<any>;
  remove(id: number): Promise<any>;
}

export class CoreControllerV2<
  Entity extends HasId,
  Service extends IsService,
  CreateDTO,
  UpdateDTO,
> {
  constructor(
    public service: Service, 
    private readonly createEntityDtoClass: new () => CreateDTO,
    private readonly updateEntityDtoClass: new () => UpdateDTO,
    private readonly validation: ValidatorOptions = {},
  ) {
  }

  @Post()
  async create(@Body() createDto: CreateDTO): Promise<Entity> {
    try {
      const obj = await ValidationConfig.validationDTO(
        {
          metatype: this.createEntityDtoClass,
          object: createDto,
        },
        this.validation,
      );
      return await this.service.create(obj);
    } catch (error) {
      if (ValidationConfig.isValidationError(error)) {
        throw ValidationConfig.handleError<Entity>(error);
      }
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
  @Post('/many')
  async createMany(@Body() createDto: CreateDTO[]): Promise<Entity[]> {
    try {
      const obj = await ValidationConfig.validationListDTO(
        {
          metatype: this.createEntityDtoClass,
          object: createDto,
        },
        this.validation,
      );
      return await this.service.createMany(obj);
    } catch (error) {
      if (ValidationConfig.isValidationError(error)) {
        throw ValidationConfig.handleError<Entity[]>(error);
      }
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Get()
  async findAll(@Query() query: any): Promise<Entity[]> {
    try {
      const relations: string[] = (query.relations as string)
        ? query.relations.split(',')
        : [];
      return await this.service.findAll(relations);
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Get('/filter')
  async findByFilter(@Query() query: any) {
    try {
      const q = { ...query, ...createPaginationConfig(query) };
      return await this.service.findByFilter(q);
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: any): Promise<Entity> {
    try {
      const relations: string[] = (query.relations as string)
        ? query.relations.split(',')
        : [];
      const item: Entity | null = await this.service.findOne(+id, relations);
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

  @Patch('single/:id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDTO): Promise<Entity> {
    try {
      const obj = await ValidationConfig.validationDTO(
        {
          metatype: this.updateEntityDtoClass,
          object: updateDto,
        },
        this.validation,
      );
      return await this.service.update(+id, obj);
    } catch (error) {
      if (ValidationConfig.isValidationError(error)) {
        throw ValidationConfig.handleError<Entity>(error);
      }
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Patch('many')
  async updateMany(@Body() updateDto: { id: number; data: UpdateDTO }[]): Promise<Entity> {
    try {
      const validatedData = [];
      for (const item of updateDto) {
        const obj = await ValidationConfig.validationDTO(
          {
            metatype: this.updateEntityDtoClass,
            object: item.data,
          },
          this.validation,
        );
        validatedData.push({ id: item.id, data: obj });
      }
      return await this.service.updateMany(validatedData);
    } catch (error) {
      if (ValidationConfig.isValidationError(error)) {
        throw ValidationConfig.handleError<Entity>(error);
      }
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Entity> {
    try {
      return await this.service.remove(+id);
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
