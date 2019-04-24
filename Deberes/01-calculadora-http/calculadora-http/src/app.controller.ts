import { Controller, Get, Post, HttpCode, Put,Delete, Headers, Query, Body, Response,Request } from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi'

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

  @Get('/nombreCookie')
  nombreCookie(@Request() request, @Response() response, @Headers() headers) {
    const cookies = request.cookies;
    const esquemaValidacionString = Joi.object().keys({
      nombre: Joi.string().required()
    });
    const objetoValidation = { nombre: cookies.nombre };
    const resultado = Joi.validate(objetoValidation, esquemaValidacionString);
    if (resultado.error) {
      return response.send({mensaje:'Error 400'});
    } else {
      if(headers.numero1 && headers.numero2) {
        const numero1 = Number(headers.numero1);
        const numero2 = Number(headers.numero2);
        const resultSuma = numero1 + numero2;
        return response.send({
          nombreUsuario: cookies.nombre,
          resultadoSuma: resultSuma
        });
      }else{
        return response.send({mensaje:'Error, falta datos en la cabecera'});
      }

    }
  }

  @Put('/setear')
  setear( @Response() response,
               @Headers() headers) {
    if(headers.numero1 && headers.numero2 && headers.nombre){
      const esquemaValidacionString = Joi.object().keys({
        nombre: Joi.string().required()
      });
      const esquemaValidacionNumero1 = Joi.object().keys({
        numero1:Joi.number().integer().required()
      });
      const esquemaValidacionNumero2 = Joi.object().keys({
        numero2:Joi.number().integer().required()
      });
      const objeto1 = {nombre: headers.nombre};
      const objeto2= {numero1: headers.numero1};
      const objeto3= {numero2: headers.numero2};
      const resultado = Joi.validate(objeto1, esquemaValidacionString);
      const resultado2 = Joi.validate(objeto2, esquemaValidacionNumero1);
      const resultado3 = Joi.validate(objeto3, esquemaValidacionNumero2);
      if (resultado.error || resultado2.error || resultado3.error ) {
        return response.send({mensaje:'Error 400'});
      } else {
          const numero1 = Number(headers.numero1);
          const numero2 = Number(headers.numero2);
          const resultSuma = numero1 + numero2;
          response.cookie('nombre', headers.nombre);
          return response.send({
            nombreUsuario: headers.nombre,
            resultadoSuma: resultSuma
          });
        }

      }else{
      return response.send({mensaje:'Error, falta datos en la cabecera'});
    }

    }

}
