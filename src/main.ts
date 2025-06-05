import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormErrorInterceptor } from './core/inteceptors/typeorm-translation-interceptor';
import { ValidationPipe } from './core/pipes/validation.pipe';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  // Interceptors
  app.useGlobalInterceptors(new TypeormErrorInterceptor());

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
