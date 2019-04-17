// @ts-ignore
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

var cookieParse = require('cookie-parse');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParse());
  await app.listen(3000);
}
bootstrap();
