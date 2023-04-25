import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseGroupsService } from './exercise-groups.service';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';

@Controller('exercise-groups')
export class ExerciseGroupsController {
  constructor(private readonly exerciseGroupsService: ExerciseGroupsService) {}

  @Post()
  create(@Body() createExerciseGroupDto: CreateExerciseGroupDto) {
    return this.exerciseGroupsService.create(createExerciseGroupDto);
  }

  @Get()
  findAll() {
    return this.exerciseGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return this.exerciseGroupsService.update(+id, updateExerciseGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseGroupsService.remove(+id);
  }
}
