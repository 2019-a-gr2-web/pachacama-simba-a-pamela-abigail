import { Controller, Get, Post, HttpCode, Put,Delete, Headers, Query, Body, Response,Request } from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi'

@Controller('/calculadoraCookies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/suma')
  @HttpCode(200)
  getSuma(@Request() request, @Response() response,@Headers() headers) {
    console.log('Headers:', headers);
    const cookieSegura = request.signedCookies.micookie;
    console.log(request.signedCookies);
    if(headers.numero1 && headers.numero2) {
      if(cookieSegura){
        const numero1 = Number(headers.numero1);
        const numero2 = Number(headers.numero2);
        const resultSuma = numero1 + numero2;
        const ganador= Number(cookieSegura) - resultSuma;
        console.log(ganador);
        if(ganador <= 0){
          return response.send({
            nombreUsuario: 'Pamela',
            resultado: resultSuma,
            mensaje:'Se le terminaron sus puntos'
          });
        }else{
          response.cookie('micookie', //nombre key
              ganador,{
                signed:true
              }); //valor
          return response.send('ok'+ ganador +'suma'+ resultSuma);
        }
      }else{
        const micookie =100;
        response.cookie('micookie', //nombre key
            micookie,{
              signed:true
            }); //valor
        return response.send('ok');
      }
    }else{
      return 'Error, falta datos en la cabecera';
    }
  }


  @Post('/resta')
  @HttpCode(201)
  postResta(@Request() request, @Response() response,
      @Body() parametrosCuerpo
  ){
    const cookieSegura = request.signedCookies.micookie;
    if(parametrosCuerpo.numero1 && parametrosCuerpo.numero2){
      if(cookieSegura){
        const numero1=Number(parametrosCuerpo.numero1);
        const numero2=Number(parametrosCuerpo.numero2);
        if(numero1>numero2) {
          const respResta = numero1 - numero2;
          const ganador= Number(cookieSegura) - respResta;
          if(ganador <= 0){
            return response.send({
              nombreUsuario: 'Pamela',
              resultado: respResta,
              mensaje:'Se le terminaron sus puntos'
            });
          }else{
            response.cookie('micookie', //nombre key
                ganador,{
                  signed:true
                }); //valor
            return response.send('ok'+ ganador +'resta'+ respResta);
          }
        }else{
          const respResta = numero2 - numero1;
          const ganador= Number(cookieSegura) - respResta;
          if(ganador <= 0){
            return response.send({
              nombreUsuario: 'Pamela',
              resultado: respResta,
              mensaje:'Se le terminaron sus puntos'
            });
          }else{
            response.cookie('micookie', //nombre key
                ganador,{
                  signed:true
                }); //valor
            return response.send('ok'+ ganador +'resta'+ respResta);
          }
        }
      }else{
        const micookie =100;
        response.cookie('micookie', //nombre key
            micookie,{
              signed:true
            }); //valor
        return response.send('ok');
      }
    }
    else {
      return 'Error, no envia numero1 o numero2';
    }
  }

  @Put('/multiplicacion')
  @HttpCode(202)
  putMulti(@Request() request, @Response() response,@Query() queryParams){
    const cookieSegura = request.signedCookies.micookie;
    if(queryParams.numero1 && queryParams.numero2){
      if(cookieSegura){
        const numero1=Number(queryParams.numero1);
        const numero2=Number(queryParams.numero2);
        const respMult = numero1*numero2;
        const ganador= Number(cookieSegura) - respMult;
        if(ganador <= 0){
          return response.send({
            nombreUsuario: 'Pamela',
            resultado: respMult,
            mensaje:'Se le terminaron sus puntos'
          });
        }else{
          response.cookie('micookie', //nombre key
              ganador,{
                signed:true
              }); //valor
          return response.send('ok'+ ganador +'multiplicacion'+ respMult);
        }
      }else{
        const micookie =100;
        response.cookie('micookie', //nombre key
            micookie,{
              signed:true
            }); //valor
        return response.send('ok');
      }
    }else{
      return 'Error, no envia parametros query';
    }
  }

  @Delete('/division')
  @HttpCode(203)
  deleteDiv(
      @Request() request, @Response() response,
      @Query() queryParams,
            @Body() parametrosCuerpo
  ){
    const cookieSegura = request.signedCookies.micookie;
    if(queryParams.numero1 && parametrosCuerpo.numero2){
      if(cookieSegura){
        const numero1=Number(queryParams.numero1);
        const numero2=Number(parametrosCuerpo.numero2);
        if(numero2 != 0){
          const respDiv = numero1/numero2;
          const ganador= Number(cookieSegura) - respDiv;
          if(ganador <= 0){
            return response.send({
              nombreUsuario: 'Pamela',
              resultado: respDiv,
              mensaje:'Se le terminaron sus puntos'
            });
          }else{
            response.cookie('micookie', //nombre key
                ganador,{
                  signed:true
                }); //valor
            return response.send('ok'+ ganador +'division'+ respDiv);
          }
        }else{
          const micookie =100;
          response.cookie('micookie', //nombre key
              micookie,{
                signed:true
              }); //valor
          return response.send('ok');
        }
        }else{
        return  'No se puede dividir para cero';
      }
    }else{
      return 'Error, no envia parametros query o parametros de cuerpo';
    }
  }

}
