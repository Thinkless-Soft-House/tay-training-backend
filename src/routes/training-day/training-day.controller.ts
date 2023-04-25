import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingDayService } from './training-day.service';
import { CreateTrainingDayDto } from './dto/create-training-day.dto';
import { UpdateTrainingDayDto } from './dto/update-training-day.dto';

@Controller('training-day')
export class TrainingDayController {
  constructor(private readonly trainingDayService: TrainingDayService) {}

  @Post()
  create(@Body() createTrainingDayDto: CreateTrainingDayDto) {
    return this.trainingDayService.create(createTrainingDayDto);
  }

  @Get()
  findAll() {
    return this.trainingDayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingDayService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainingDayDto: UpdateTrainingDayDto,
  ) {
    return this.trainingDayService.update(+id, updateTrainingDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingDayService.remove(+id);
  }
}
