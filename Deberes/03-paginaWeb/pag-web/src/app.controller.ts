import { Controller, Get,Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/pagWeb')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('inicio')
  peliculas(@Response() res){
    return res.render('inicio',{

    });
  }
}
