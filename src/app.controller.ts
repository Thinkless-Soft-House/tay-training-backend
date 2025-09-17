import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './routes/auth/jwt-auth.guard';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    console.log('getHello');
    return this.appService.getHello();
  }

  @Public()
  @Get('abc')
  getHello2(): string {
    console.log('getHello2');
    return this.appService.getHello2();
  }

  @Public()
  @Get('def')
  getHello3(): string {
    console.log('getHello3');
    return this.appService.getHello3();
  }

  @Public()
  @Get('env')
  getEnv(): Record<string, string | undefined> {
    return process.env;
  }

  @Public()
  @Get('files-count')
  getFilesCount(): Record<string, number | string> {
    const basePath = './files';
    try {
      const folders = readdirSync(basePath).filter((item) => {
        const itemPath = join(basePath, item);
        return statSync(itemPath).isDirectory();
      });

      const counts: Record<string, number> = {};
      folders.forEach((folder) => {
        const folderPath = join(basePath, folder);
        const files = readdirSync(folderPath).filter((item) => {
          const itemPath = join(folderPath, item);
          return statSync(itemPath).isFile();
        });
        counts[folder] = files.length;
      });
      return counts;
    } catch (error) {
      return { error: 'Erro ao acessar a pasta ./files' };
    }
  }
}
