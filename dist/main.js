"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_translation_interceptor_1 = require("./core/inteceptors/typeorm-translation-interceptor");
const validation_pipe_1 = require("./core/pipes/validation.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new typeorm_translation_interceptor_1.TypeormErrorInterceptor());
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map