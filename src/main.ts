import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormErrorInterceptor } from './core/inteceptors/typeorm-translation-interceptor';
import { ValidationPipe } from './core/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Interceptors
  app.useGlobalInterceptors(new TypeormErrorInterceptor());

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
