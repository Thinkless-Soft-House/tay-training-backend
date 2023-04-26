import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MethodsService } from './methods.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { ErrorHandler } from 'src/core/handlers/error-handler.handler';

@Controller('methods')
export class MethodsController {
  constructor(private readonly methodsService: MethodsService) {}

  @Post()
  async create(@Body() createMethodDto: CreateMethodDto) {
    try {
      const create$ = await this.methodsService.create(createMethodDto);
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
  async findAll() {
    try {
      return this.methodsService.findAll();
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
      const exercise = await this.methodsService.findOne(+id);
      if (!exercise) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }
      return exercise;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMethodDto: UpdateMethodDto,
  ) {
    try {
      const update$ = await this.methodsService.update(+id, updateMethodDto);
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
      return this.methodsService.remove(+id);
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
