import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT);
  console.log(`PORT: ${process.env.PORT}`);
  console.log('DB:', process.env.MONGO_URI);
  console.log('Cors: ', process.env.CORS_ORIGIN);
}
bootstrap();
