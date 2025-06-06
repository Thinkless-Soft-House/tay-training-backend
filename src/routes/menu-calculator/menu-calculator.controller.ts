import {
  Controller,
  UsePipes,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Body,
  UploadedFiles,
  UseInterceptors,
  StreamableFile,
  Header,
  Res,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { MenuCalculatorService } from './menu-calculator.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { CoreControllerV2 } from 'src/core/utils/core-controller-v2.controller';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { Public } from '../auth/jwt-auth.guard';
@Controller('menu-calculator')
@UsePipes(new ValidationPipe())
export class MenuCalculatorController extends CoreControllerV2<
  Menu,
  MenuCalculatorService,
  CreateMenuDto,
  UpdateMenuDto
> {
  constructor(private readonly menuCalculatorService: MenuCalculatorService) {
    super(menuCalculatorService, CreateMenuDto, UpdateMenuDto);
  }

  @Public()
  @Get('find-by-calories/:calories')
  async findByCalories(@Param('calories', ParseIntPipe) calories: number) {
    return this.menuCalculatorService.findByCalories(Number(calories));
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  async createWithFile(
    @Body() createDto: any,
    @UploadedFiles()
    file: {
      file?: any[];
    },
  ) {
    return this.menuCalculatorService.createWithFile(createDto, file?.file?.[0]);
  }

  @Patch('single/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  async updateWithFile(
    @Param('id') id: string,
    @Body() updateDto: any,
    @UploadedFiles()
    file: {
      file?: any[];
    },
  ) {
    return this.menuCalculatorService.updateWithFile(+id, updateDto, file?.file?.[0]);
  }

  @Public()
  @Get('file/:id')
  async getFile(@Param('id') id: string, @Res({ passthrough: true }) res): Promise<StreamableFile> {
    const filePath = await this.menuCalculatorService.getFilePath(+id);
    const fileName = filePath.split('/').pop() || 'arquivo.pdf';
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    const fileStream = createReadStream(filePath);
    return new StreamableFile(fileStream);
  }
}
