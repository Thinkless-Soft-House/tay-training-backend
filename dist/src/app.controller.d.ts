import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getHello2(): string;
    getHello3(): string;
    getEnv(): Record<string, string | undefined>;
    getFilesCount(): Record<string, number | string>;
}
