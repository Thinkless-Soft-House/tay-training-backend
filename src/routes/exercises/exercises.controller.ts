import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ErrorHandler } from 'src/core/handlers/error-handler.handler';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    try {
      const create$ = await this.exercisesService.create(createExerciseDto);
      return create$;
    } catch (error) {
      console.log('error on create exercise', error);
      throw new ErrorHandler(error.message, 400, 400);
    }
  }

  @Get()
  async findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const exercise = await this.exercisesService.findOne(+id);
    if (!exercise) {
      throw new ErrorHandler('Exercicio não encontrado', 404, 404);
    }
    return exercise;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
