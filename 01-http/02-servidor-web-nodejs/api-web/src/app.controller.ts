import { Controller, Get, Post, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post() //Metodo Http
  @HttpCode(200)
  postHello(){
    return 'hola mundo en post';
  }
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
