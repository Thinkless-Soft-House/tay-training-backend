import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../routes/auth/jwt-auth.guard';
import { TrainingAccessService } from './training-access.service';
import { CreateTrainingAccessDto } from './dto/create-training-access.dto';

@Controller('training-access')
@Public()
export class TrainingAccessController {
  constructor(private readonly service: TrainingAccessService) {}

  @Post()
  async create(@Body() dto: CreateTrainingAccessDto) {
    return await this.service.create(dto.clientId, dto.trainingId);
  }

  @Get('top5-today')
  async top5() {
    return await this.service.top5Today();
  }
}
