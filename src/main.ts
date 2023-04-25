import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormErrorInterceptor } from './core/utils/inteceptors/typeorm-translation-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Interceptors
  app.useGlobalInterceptors(new TypeormErrorInterceptor());

  await app.listen(3000);
}
bootstrap();
