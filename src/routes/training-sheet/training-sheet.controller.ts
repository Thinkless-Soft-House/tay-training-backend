import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingSheetService } from './training-sheet.service';
import { CreateTrainingSheetDto } from './dto/create-training-sheet.dto';
import { UpdateTrainingSheetDto } from './dto/update-training-sheet.dto';

@Controller('training-sheet')
export class TrainingSheetController {
  constructor(private readonly trainingSheetService: TrainingSheetService) {}

  @Post()
  create(@Body() createTrainingSheetDto: CreateTrainingSheetDto) {
    return this.trainingSheetService.create(createTrainingSheetDto);
  }

  @Get()
  findAll() {
    return this.trainingSheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingSheetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainingSheetDto: UpdateTrainingSheetDto,
  ) {
    return this.trainingSheetService.update(+id, updateTrainingSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingSheetService.remove(+id);
  }
}
