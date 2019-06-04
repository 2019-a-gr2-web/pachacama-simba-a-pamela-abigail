import {Controller, Get, Body, Post, Res, Req, Param, Query} from '@nestjs/common';
import { AppService } from "./app.service";
import {Actor} from "./interfaces/actor";
import {Peliculas} from "./interfaces/pelicula";

@Controller('/api/actor')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  login( @Res() res
  ){
      res.cookie('usuario','',{signed:false});
      res.render('login')
  }

  @Post('login')
  loginPost ( @Body('nombreUsuario') cookie:string, @Res() res
  ){
    res.cookie('usuario',cookie,{signed:true});
    res.redirect('/api/actor/menu')
  }

  @Get('menu')
  menu(  @Res() res,@Req() req
  ){
    const cookieSegura = req.signedCookies.usuario;
    if(cookieSegura){
      res.render('menu',{nombreUsuario:cookieSegura})
    }else{
      res.redirect('/api/actor/login')
    }

  }
  @Post('menu')
  menuPost(  @Res() res
  ){

      res.redirect('/api/actor/gestion-papa')
    }


  @Get('gestion-papa')
  gestionPapa( @Res() res,
      @Req() req
  ){
    const cookieSegura = req.signedCookies.usuario;
    const arregloActores = this.appService.bddActores;
    if(cookieSegura){
        res.render('gestion-actor',{nombreUsuario:cookieSegura, arregloActores:arregloActores});
    }else{
        res.redirect('/api/actor/login')
    }

  }

    @Post('gestion-papa')
    gestionPapaPost(  @Res() res
    ){
        res.redirect('/api/actor/buscar')

    }

  @Get('gestion-papa/:idActor')
  gestionHijo(  @Param() par,
                @Res() res,
               @Req() req,
                @Query() busqueda
  ){
    const cookieSegura = req.signedCookies.usuario;

        console.log(busqueda);
        if (cookieSegura) {
          let arregloPeliculas = this.appService.peli(par.idActor)

          if(busqueda.busqueda){
            arregloPeliculas = this.appService.buscarPorNombrePeli(busqueda.busqueda)
          }


          res.render('gestion-pelicula', {
            nombreUsuario: cookieSegura,
            arregloPeliculas: arregloPeliculas,
            idActor: par.idActor
          });
        } else {
          res.redirect('/api/actor/login')
        }

  }

  @Post('gestion-papa/:idActor')
  gestionHijoPost(  @Res() res
  ){
    res.redirect('/api/actor/buscar')

  }

  @Get('crear')
  crearActor(
      @Res() res
  ){
    res.render('crear-actor')
  }

  @Post('crear')
  crearActorPost(
      @Body() actor:Actor,
      @Res() res

  ) {
    actor.fechaNacimiento = new Date(actor.fechaNacimiento);
    actor.numeroPeliculas =Number(actor.numeroPeliculas);
    actor.retirado = Boolean(actor.retirado);

    this.appService.crear(actor);
    res.redirect('/api/actor/gestion-papa');
    console.log(actor);

  }

  @Get('crearPeli')
  crearPeli(
      @Res() res,
      @Param() par,
  ){
    res.render('crear-pelicula',{idActor: par.idActor} )
    console.log(par.idActor)
  }

  @Post('crearPeli')
  crearPeliPost(@Body('idActor') idActor:number,
      @Body() pelicula:Peliculas,
      @Res() res
  ) {
    pelicula.anioLanzamineto = Number(pelicula.anioLanzamineto);
    pelicula.rating =Number(pelicula.rating);
    pelicula.idActor = Number(idActor);
    this.appService.crearPelicula(pelicula);
    res.redirect('/api/actor/gestion-papa/'+pelicula.idActor);
    console.log(Number(idActor));

  }
    @Post('buscar')
    buscarActor(
        @Body('nombre') nombre:string,
        @Res() res,
    ){

        this.appService.buscarPorNombre(nombre);
        res.redirect('/api/actor/gestion-papa');
        console.log(nombre);

    }
  @Post('eliminar')
  eliminarActor(
      @Body() actor:Actor,
      @Res() res,
  ){
    actor.idActor =Number(actor.idActor)
    this.appService.eliminarPorId(actor.idActor);
    res.redirect('/api/actor/gestion-papa');
    console.log(actor);

  }

  @Post('buscarPeli')
  buscarPeli(@Body('nombre') nombre:string,
             @Body('idActor') idActor:number,
      @Res() res,
  ){

    this.appService.buscarPorNombrePeli(nombre);
    res.redirect('/api/actor/gestion-papa/'+idActor);
    console.log(idActor);

  }
  @Post('eliminarPeli')
  eliminarPeli(@Body('idActor') idActor:number,
      @Body() pelicula:Peliculas,
      @Res() res,
  ){
    pelicula.idPelicula =Number(pelicula.idPelicula)

    this.appService.eliminarPorIdPeli(pelicula.idPelicula);
    res.redirect('/api/actor/gestion-papa/'+idActor);
    console.log(pelicula);

  }

}
