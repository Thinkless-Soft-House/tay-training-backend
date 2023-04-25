import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExerciseMethodService } from './exercise-method.service';
import { CreateExerciseMethodDto } from './dto/create-exercise-method.dto';
import { UpdateExerciseMethodDto } from './dto/update-exercise-method.dto';

@Controller('exercise-method')
export class ExerciseMethodController {
  constructor(private readonly exerciseMethodService: ExerciseMethodService) {}

  @Post()
  create(@Body() createExerciseMethodDto: CreateExerciseMethodDto) {
    return this.exerciseMethodService.create(createExerciseMethodDto);
  }

  @Get()
  findAll() {
    return this.exerciseMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseMethodService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseMethodDto: UpdateExerciseMethodDto,
  ) {
    return this.exerciseMethodService.update(+id, updateExerciseMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseMethodService.remove(+id);
  }
}
