import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { createdocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('', app, createdocument(app));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
