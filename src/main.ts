import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 8000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);

  Logger.log(`Server start on http:/192.168.1.48:${port}`, 'URL');
  Logger.log(process.env.SECRET);
}
bootstrap();
