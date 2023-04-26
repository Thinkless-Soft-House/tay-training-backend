import { Controller } from '@nestjs/common';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { MethodsService } from './methods.service';
import { CreateMethodDto } from './dto/create-method.dto';
import { UpdateMethodDto } from './dto/update-method.dto';
import { Method } from './entities/method.entity';

@Controller('methods')
export class MethodsController extends CoreController<
  Method,
  MethodsService,
  CreateMethodDto,
  UpdateMethodDto
> {
  constructor(private readonly methodsService: MethodsService) {
    super(methodsService);
  }
}
