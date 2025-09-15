import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
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
import { Public } from '../auth/jwt-auth.guard';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CustomCacheInterceptor } from 'src/core/inteceptors/cache.interceptor';
import { existsSync } from 'fs';

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
      // console.log(
      //   'TrainingSheetController.createWithFile() => Criando um novo treino com arquivo',
      // );
      // console.log(
      //   'TrainingSheetController.createWithFile() => file',
      //   file.file[0].buffer,
      // );

      // return { ok: true };
      let create$;
      if (file && !!file.file) {
        // console.log('has file, file.file => ', file.file);
        create$ = await this.service.createWithFile(
          { ...createDto, trainingDays: JSON.parse(createDto.trainingDays) },
          file.file[0].buffer,
        );
      } else {
        // console.log('has no file');
        create$ = await this.service.create({
          ...createDto,
          trainingDays: JSON.parse(createDto.trainingDays),
        });
      }

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
      // console.log(
      //   'TrainingSheetController.updateWithFile() => Atualizando um treino com arquivo',
      // );

      let update$;

      if (file && file.file) {
        // console.log('has file');
        update$ = await this.service.updateWithFile(
          +id,
          updateDto,
          file.file[0].buffer,
        );
      } else {
        // console.log('has no file');
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

  @Public()
  @Get('file/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    try {
      // Primeiro, verificar se o treino existe
      const trainingSheet = await this.service.findOne(+id);
      if (!trainingSheet) {
        res.status(404).json({ error: 'Treino não encontrado' });
        return;
      }

      // Configuração do arquivo (igual ao service)
      const fileConfig = {
        filename: 'Treino_' + id + '.pdf',
        path: './files/workouts/',
      };

      const fullPath = `${fileConfig.path}${fileConfig.filename}`;

      // Verificar se o arquivo existe fisicamente
      if (!existsSync(fullPath)) {
        res.status(404).json({ error: 'Arquivo não encontrado no servidor' });
        return;
      }

      // Obter informações do arquivo (checado anteriormente via existsSync)

      // Obter o arquivo através do serviço (retorna Buffer)
      const fileBuffer = await this.service.getFile(+id);

      // Configurar headers adequados (comportamento igual ao menu-calculator.getPdfByCalories)
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': fileBuffer.length.toString(),
        'Content-Disposition': `attachment; filename="${fileConfig.filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      });

      //.

      // Verificar se cliente ainda está conectado
      if ((res as any).destroyed || (res as any).closed) {
        console.log('⚠️ Cliente já desconectado, abortando envio');
        return;
      }

      res.send(fileBuffer);
    } catch (error) {
      console.error('Erro no getFile (training-sheet):', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        details: error.message,
      });
    }
  }

  @Public()
  // @UseInterceptors(CustomCacheInterceptor)
  @CacheTTL(10 * 60 * 1000) // 10 minutos
  @Get('planner-home/:slug')
  async getPlannerHome(@Param('slug') slug: string) {
    return await this.service.getPlannerHomeData(slug);
  }

  @Public()
  // @UseInterceptors(CustomCacheInterceptor)
  @CacheTTL(10 * 60 * 1000) // 10 minutos
  @Get('week/:slug/:week')
  async getWeekData(@Param('slug') slug: string, @Param('week') week: string) {
    const weekNumber = parseInt(week, 10);
    if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 4) {
      throw new NotFoundException('Semana inválida');
    }
    return await this.service.getWeekData(slug, weekNumber);
  }

  @Public()
  // @UseInterceptors(CustomCacheInterceptor)
  @Get('workout-detail/:slug/:week/:workout')
  @CacheTTL(10 * 60 * 1000) // 10 minutos
  async getWorkoutDetail(
    @Param('slug') slug: string,
    @Param('week', ParseIntPipe) week: number,
    @Param('workout', ParseIntPipe) workoutIndex: number,
  ) {
    if (isNaN(week) || week < 1 || week > 4) {
      throw new NotFoundException('Semana inválida');
    }
    return await this.service.getWorkoutDetail(slug, week, workoutIndex);
  }
}
