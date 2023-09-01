import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TrainingSheetService } from './training-sheet.service';
import { CreateTrainingSheetDto } from './dto/create-training-sheet.dto';
import { UpdateTrainingSheetDto } from './dto/update-training-sheet.dto';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { TrainingSheet } from './entities/training-sheet.entity';
import { ErrorHandler } from 'src/core/handlers/error.handler';
import slugify from 'slugify';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'multer';
import { Response } from 'express';

@Controller('training-sheet')
export class TrainingSheetController extends CoreController<
  TrainingSheet,
  TrainingSheetService,
  CreateTrainingSheetDto,
  UpdateTrainingSheetDto
> {
  constructor(private readonly trainingSheetService: TrainingSheetService) {
    super(trainingSheetService);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  async createWithFile(
    @Body() createDto: any,
    @UploadedFiles()
    file: {
      file?: MulterFile[];
    },
  ) {
    try {
      console.log(
        'TrainingSheetController.createWithFile() => Criando um novo treino com arquivo',
      );
      // console.log(
      //   'TrainingSheetController.createWithFile() => file',
      //   file.file[0].buffer,
      // );

      // return { ok: true };
      const create$: TrainingSheet = await this.service.createWithFile(
        { ...createDto, trainingDays: JSON.parse(createDto.trainingDays) },
        file.file[0].buffer,
      );
      return create$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Patch('single/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  async updateWithFile(
    @Param('id') id: string,
    @Body() updateDto: any,
    @UploadedFiles()
    file: {
      file?: MulterFile[];
    },
  ) {
    try {
      console.log(
        'TrainingSheetController.updateWithFile() => Atualizando um treino com arquivo',
      );

      let update$;
      if (file && file.file) {
        update$ = await this.service.updateWithFile(
          +id,
          updateDto,
          file.file[0].buffer,
        );
      } else {
        update$ = await this.service.update(+id, updateDto);
      }
      return update$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Get('file/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.service.getFile(+id);
      res.set('Content-Type', 'application/pdf'); // Definir o tipo de conteúdo como application/pdf
      res.send(file);
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
