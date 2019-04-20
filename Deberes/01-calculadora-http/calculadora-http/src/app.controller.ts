import { Controller, Get, Post, HttpCode, Put,Delete, Headers, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/suma')
  @HttpCode(200)
  getSuma(@Headers() headers): string {
    console.log('Headers:', headers);
    if(headers.numero1 && headers.numero2) {
      const numero1 = Number(headers.numero1);
      const numero2 = Number(headers.numero2);
      const resultSuma = numero1 + numero2;
      return String(resultSuma);
    }else{
      return 'Error, falta datos en la cabecera';
    }
    }
  @Post('/resta')
  @HttpCode(201)
  postResta(
      @Body() parametrosCuerpo
  ){
    if(parametrosCuerpo.numero1 && parametrosCuerpo.numero2){
      const numero1=Number(parametrosCuerpo.numero1);
      const numero2=Number(parametrosCuerpo.numero2);
      if(numero1>numero2) {
        const respResta = numero1 - numero2;
        return  String(respResta);
      }else{
        const respResta = numero2 - numero1;
        return  String(respResta);
      }
    }
    else {
      return 'Error, no envia numero1 o numero2';
    }
  }

  @Put('/multiplicacion')
  @HttpCode(202)
  putMulti(@Query() queryParams){
    if(queryParams.numero1 && queryParams.numero2){
      const numero1=Number(queryParams.numero1);
      const numero2=Number(queryParams.numero2);
      const respMult = numero1*numero2;
      return `Multiplicacion de  ${queryParams.numero1} * ${queryParams.numero2} = `+String(respMult);
    }else{
      return 'Error, no envia parametros query';
    }
  }

  @Delete('/division')
  @HttpCode(203)
  deleteDiv(@Query() queryParams,
            @Body() parametrosCuerpo
  ){
    if(queryParams.numero1 && parametrosCuerpo.numero2){
      const numero1=Number(queryParams.numero1);
      const numero2=Number(parametrosCuerpo.numero2);
      const respDiv = numero1/numero2;
      return  String(respDiv);
    }else{
      return 'Error, no envia parametros query o parametros de cuerpo';
    }
  }

}
