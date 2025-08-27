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
import { createReadStream, existsSync, statSync } from 'fs';
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
    return this.menuCalculatorService.createWithFile(
      createDto,
      file?.file?.[0],
    );
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
    return this.menuCalculatorService.updateWithFile(
      +id,
      updateDto,
      file?.file?.[0],
    );
  }

  @Public()
  @Get('file/:id')
  async getFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    try {
      const filePath = await this.menuCalculatorService.getFilePath(+id);

      // Verificar se o arquivo existe
      if (!existsSync(filePath)) {
        res.status(404).send('Arquivo não encontrado');
        return;
      }

      // Obter informações do arquivo
      const stats = statSync(filePath);
      const fileName = filePath.split('/').pop() || 'arquivo.pdf';

      // Configurar headers adequados
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': stats.size.toString(),
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      });

      const fileStream = createReadStream(filePath);

      // Adicionar tratamento de erro para o stream
      fileStream.on('error', (error) => {
        console.error('Erro ao ler arquivo:', error);
        if (!res.headersSent) {
          res.status(500).send('Erro interno do servidor');
        }
      });

      return new StreamableFile(fileStream);
    } catch (error) {
      console.error('Erro no getFile:', error);
      if (!res.headersSent) {
        res.status(500).send('Erro interno do servidor');
      }
    }
  }

@Public()
@Get('find-by-calories/:calories/pdf')
async getPdfByCalories(
  @Param('calories', ParseIntPipe) calories: number,
  @Res() res: Response, // ❌ Remova { passthrough: true }
): Promise<void> {
  try {
    console.log(`🔍 Buscando PDF para ${calories} calorias`);
    
    const menu = await this.menuCalculatorService.findByCalories(
      Number(calories),
    );

    if (!menu || !menu.pdfUrl) {
      console.log('❌ Menu ou PDF não encontrado');
      res.status(404).json({ 
        error: 'PDF não encontrado para este menu',
        calories 
      });
      return;
    }

    const filePath = menu.pdfUrl;
    console.log(`📂 Caminho do arquivo: ${filePath}`);

    // Verificar se o arquivo existe
    if (!existsSync(filePath)) {
      console.log('❌ Arquivo não existe no sistema');
      res.status(404).json({ 
        error: 'Arquivo PDF não encontrado no servidor',
        path: filePath 
      });
      return;
    }

    // Obter informações do arquivo
    const stats = statSync(filePath);
    const fileName = filePath.split('/').pop() || 'menu.pdf';
    
    console.log(`📊 Arquivo encontrado - Tamanho: ${stats.size} bytes`);

    // ✅ Headers corretos para PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': stats.size.toString(),
      'Content-Disposition': `inline; filename="${fileName}"`, // inline em vez de attachment
      'Accept-Ranges': 'bytes', // Permite range requests
      'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
    });

    const fileStream = createReadStream(filePath);

    // ✅ Tratamento robusto de erro
    fileStream.on('error', (error) => {
      console.error('❌ Erro ao ler arquivo PDF:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          error: 'Erro ao processar arquivo PDF',
          details: error.message 
        });
      }
    });

    fileStream.on('open', () => {
      console.log('✅ Stream do arquivo iniciado');
    });

    fileStream.on('end', () => {
      console.log('✅ Stream do arquivo finalizado');
    });

    // ✅ Pipe direto para resposta
    fileStream.pipe(res);

  } catch (error) {
    console.error('❌ Erro geral no getPdfByCalories:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        details: error.message 
      });
    }
  }
}
}
