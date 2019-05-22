// @ts-ignore
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path';
import * as express from 'express';
const cookieParser =  require ('cookie-parser');
import *as path from 'path';
import * as favicon from 'serve-favicon';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(favicon(path.join(__dirname,'..','public','imagenes', 'gadget.ico')));
  app.use(cookieParser('Secreto'));
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('public'));
  await app.listen(3000);
}
bootstrap();
