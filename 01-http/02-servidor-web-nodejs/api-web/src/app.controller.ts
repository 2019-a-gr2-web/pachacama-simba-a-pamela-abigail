// @ts-ignore
import { Controller, Get, Post, HttpCode, Put,Delete, Headers, Query, Param, Body, Request,Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello-world')
  helloWorld(): string {
    return 'Hello World';
  }
// Post http://localhost:300/api
  @Post('/hola-mundo')                   //Metodo Http
  //@HttpCode(200)
  holaMundo(){
    return 'hola mundo en post';
  }
  @Put('/hola-mon')
  holaMon(){
    return 'Hola Mon en put';
  }
  @Delete('/salut-monde')
  salutMonde(){
    return 'salut monde en delete';
  }
  @Get('/adivina')
  adivina(@Headers() headers): string {
    console.log('Headers:', headers);
    const numeroRandomico = Math.round(Math.random()*10);
    const numeroDeCabecera=Number(headers.numero);
    if(numeroDeCabecera==numeroRandomico){
      return 'ok';
    }else{
      return ':(';
    }

    /***
     //variables como consts
     let nombre: string='Pamela' ;//String
     let edad=29 ; //number
     let sueldo=1.20 ;//number
     let casado=false ;//boolean
     let hijos=null ;//null
     let  alias=undefine;//underfine
     ***/

  }
  @Post('/consultar')
  consultar(@Query() queryParams){
    if(queryParams.nombre){
      return `Hola ${queryParams.nombre}`
    }else{
      return 'Hola extraño';
    }
  }

  @Get('/ciudad/:idCiudad')
  ciudad(@Param() parametrosRuta){
    switch(parametrosRuta.idCiudad.toLowerCase()){
      case 'quito':
        return 'Que fue';
      case 'guayaquil':
        return 'Que maah ñañoshh';
      default:
        return 'hola';

    }

  }

  @Post('registroComida')
  registroComida(
      @Body() parametrosCuerpo,
      @Response() response
){
    if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
      const cantidad=Number(parametrosCuerpo.cantidad);
      if(cantidad>1){
        response.set('Premio','Fanesca');
      }
      return response.send({mensaje:'Registro Creado'});
    } else {
      return response.status(400).send({mensaje:'Error, no envia nombre o cantidad', error: 400});
    }
  }
  @Get('/semilla')
  semilla(@Request() request){
    console.log(request.cookies);
    const cookies = request.cookies;
    if(cookies.micookie){
      return 'ok'
    }else{
      return ':('
    }
  }
  /*
  *Segmento inicial: / api
  * 1) Segmento Accion: GET 'hello-world' --> 'Hello world'
  * 2) Segmento Accion:Post 'hola-mundo' --> 'Hola mundo'
  * 3) Segmento Accion:PUT 'hola-mon'-->'Hola mon'
  * 4) Segmento Accion:DELETE 'salut-monde'-->'salut Monde
   */
  /**@NombreDecorador() //Decorador-> funcion
   class usuario{
    @atributoPublico; //atributo
    private atributoPrivado;
    protected atributoProtegido;

    constructor(@Parametro atributoPublico, atributoPrivado,atributoProtegido){
      this.atributoPublico=atributoPublico;
      this.atributoPrivado=atributoPrivado;
      this.atributoProtegido=atributoProtegido;
    }
    @MetodoA()
    public metodoPublico(){}

  @MetodoB()
  private metodoPrivado(){}
    protected metdoProtegifo(){}

   **/
}

/**const json=[
  {
    llave: 'valor', //solo funciona con comillas doble
    "key": "value",
    'nombre': "Pamela",
    edad: 29,
    sueldo: 10.21,
    casado: false,
    hijos: null,
    mascotas:["cachetas",
      1,
      1.01,
      false,
      null,
      {
        "nombre": "Pamela"
      },
    ]
  }
];

let objeto={
  propiedad:'valor',
  propiedadDos:'valor2'
};**/
/**objeto.propiedad//valor
objeto.propiedadDos//valor2

objeto.propiedadTres='valor3';
objeto['propiedadTres']='valor3';
delete objeto.propiedadTes;//destruir
objeto.propiedadTres=undefined;//destruir
 **/