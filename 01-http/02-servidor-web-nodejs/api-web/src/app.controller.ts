import { Controller, Get, Post, HttpCode, Put,Delete, Headers } from '@nestjs/common';
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
    return 'salut monde en delet';
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