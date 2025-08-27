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
  @Res() res: Response,
): Promise<void> {
  let fileStream: ReadStream | null = null;
  
  try {
    console.log(`🔍 [${new Date().toISOString()}] Buscando PDF para ${calories} calorias`);
    
    const menu = await this.menuCalculatorService.findByCalories(Number(calories));

    if (!menu || !menu.pdfUrl) {
      console.log(`❌ Menu ou PDF não encontrado para ${calories} calorias`);
      return res.status(404).json({ 
        error: 'PDF não encontrado',
        calories 
      });
    }

    const filePath = menu.pdfUrl;
    console.log(`📂 Arquivo: ${filePath}`);

    if (!existsSync(filePath)) {
      console.log(`❌ Arquivo físico não existe: ${filePath}`);
      return res.status(404).json({ 
        error: 'Arquivo não encontrado no servidor' 
      });
    }

    const stats = statSync(filePath);
    const fileName = filePath.split('/').pop() || 'menu.pdf';
    
    console.log(`📊 Arquivo OK - Tamanho: ${stats.size} bytes`);

    // HEADERS OTIMIZADOS PARA QUIC
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': stats.size.toString(),
      'Content-Disposition': `inline; filename="${fileName}"`,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      // CRÍTICO: Headers para evitar QUIC issues
      'Connection': 'keep-alive',
      'Transfer-Encoding': 'identity', // Evita chunked encoding
    });

    fileStream = createReadStream(filePath, {
      highWaterMark: 64 * 1024, // Buffer de 64KB (padrão menor)
    });

    // PROTEÇÃO CONTRA QUIC ERRORS
    let streamStarted = false;
    let streamCompleted = false;

    fileStream.on('open', () => {
      console.log('✅ Stream iniciado');
      streamStarted = true;
    });

    fileStream.on('data', (chunk) => {
      // Verifica se a conexão ainda está ativa
      if (res.destroyed || res.closed) {
        console.log('⚠️ Conexão cliente fechada, interrompendo stream');
        fileStream?.destroy();
        return;
      }
    });

    fileStream.on('end', () => {
      console.log('✅ Stream finalizado com sucesso');
      streamCompleted = true;
    });

    fileStream.on('error', (error) => {
      console.error('❌ Erro no stream:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          error: 'Erro ao processar arquivo',
          details: error.message 
        });
      }
    });

    // Monitorar desconexão do cliente
    res.on('close', () => {
      console.log('🔌 Cliente desconectou');
      if (fileStream && !streamCompleted) {
        fileStream.destroy();
      }
    });

    res.on('error', (error) => {
      console.error('❌ Erro na resposta HTTP:', error);
      if (fileStream) {
        fileStream.destroy();
      }
    });

    // PIPE COM TRATAMENTO DE ERRO
    fileStream.pipe(res).on('error', (error) => {
      console.error('❌ Erro no pipe:', error);
      if (!res.headersSent) {
        res.status(500).end();
      }
    });

  } catch (error) {
    console.error('❌ Erro geral:', error);
    
    // Limpar stream se existir
    if (fileStream) {
      fileStream.destroy();
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        details: error.message 
      });
    }
  }
}
}
