import { Controller, Get, Post, Res, Body, Session, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {Auto} from "./interfaces/auto";
import {AutoCreateDto} from "./dto/auto.create.dto";
import {validate} from "class-validator";
import {AutoUpdateDto} from "./dto/auto.update.dto";

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/iniciarSesion')
  iniciarSesion(@Res() res){
    res.render('iniciarSesion')
  }

  @Post('/iniciarSesion')
  async iniciarSesionPost(@Body() usuario,
                          @Session() session,
                          @Res() res){
    const arregloUsuario = await this.appService.buscar({relations:["rolId"]});

    arregloUsuario.forEach((datosUsuario)=>{

      if(usuario.tipoUsuario == datosUsuario.rolId.idRol && usuario.usuario == datosUsuario.nombre && usuario.password == datosUsuario.password){
          session.username=datosUsuario.nombre;
          session.rol=datosUsuario.rolId.idRol;
          session.userId=datosUsuario.idUsuario;
          console.log(session.username);
          console.log(session.rol);
          console.log(session.userId);
      }else{
        if(session.username== null){
          session.username='undefined';
          console.log(session.username);
        }
      }
    })
    if(session.username==='undefined'){
      //res.redirect('bienvenida');
      res.redirect('iniciarSesion');
    }else{
      res.redirect('bienvenida');
    }
  }

  @Get('logout')
  logout(
      @Res() res,
      @Session() session
  ){
    session.username=undefined;
    session.rol=undefined;
    session.destroy();
    res.redirect('iniciarSesion');
  }
  @Post('/eliminar/:idAuto')
  async  eliminar(
      @Param() param,
      @Res() res,
  ) {
    try {
      const respuestaEliminar= await this.appService.eliminarPorId(param.idAuto);
      res.redirect('/examen/bienvenida');
    } catch (e) {
      console.error(e)
      res.redirect('examen/iniciarSesion');
    }


  }

  @Get('/bienvenida')
  bienvenida(@Session() session,
             @Res() res){
    if(session.username){
      res.render('bienvenida',{
        nombre:session.username,rol:session.rol, idUsuario: session.userId});
    }else{
      res.redirect('iniciarSesion');
    }
  }

  @Get('/verAuto/:idUsuario')
  async verAuto(@Session() session,
                @Param() param,
                @Res() res) {
    const arregloAuto = await this.appService.buscarAutos({
      relations: ["usuarios"],
      where: {usuarios: {idUsuario: param.idUsuario}}
    });
    if (session.username) {
      console.log(param.idUsuario);
      res.render('verAuto', {
        nombre: session.username,idUsuario:param.idUsuario, arrayAuto: arregloAuto
      });
    } else {
      res.redirect('/examen/bienvenida');
    }
  }

  @Get('/verConductores')
  async verConductor(@Session() session,
                @Param() param,
                @Res() res) {
    const arregloConductores = await this.appService.buscar({
      relations: ["rolId"],
      where: {rolId: {idRol: 2}}
    });
    if (session.username) {
      res.render('verConductores', {
        nombre: session.username, arrayConductores: arregloConductores
      });
    } else {
      res.redirect('/examen/bienvenida');
    }
  }

  @Get('/crearAuto/:idUsuario')
  async crearAuto(@Session() session,
                  @Param() param,
                   @Res() res){

    if(session.username){
      res.render('crearAuto',{
        nombre:session.username,idUsuario: param.idUsuario});
    }else{
      res.redirect('examen/iniciarSesion');
    }
  }

  @Post('/crearAuto/:idUsuario')
  async crearAutoPost(
      @Body() auto: Auto,
      @Param() param,
      @Session() session,
      @Res() res

  ) {
    auto.usuarios = Number(param.idUsuario);
    auto.chasis = Number(auto.chasis);
    auto.anio = Number(auto.anio);
    auto.costo = Number(auto.costo);

    let autoAValidar = new AutoCreateDto();

    autoAValidar.chasis = auto.chasis;
    autoAValidar.nombreMarca = auto.nombreMarca;
    autoAValidar.colorUno = auto.colorUno;
    autoAValidar.colorDos = auto.colorDos;
    autoAValidar.nombreModelo = auto.nombreModelo;
    autoAValidar.anio = auto.anio;
    autoAValidar.costo = auto.costo;
    autoAValidar.usuarios = auto.usuarios;

    try {
      const errores = await validate(autoAValidar);
      console.log(errores);
      console.log(autoAValidar);
      console.log(auto);
      if (errores.length > 0) {
        console.error(errores);
        res.redirect('/examen/crearAuto');
      } else {
        const respuestaCrear = await this.appService.crearAuto(auto);
        console.log('Respues: ', respuestaCrear);
        res.redirect('/examen/verAuto/'+auto.usuarios);
      }

    } catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500});
    }

    console.log(auto);
  }

  @Get('buscar')
  async buscarAutos(@Session() session,
               @Res() res,
              @Body() auto,
                    ){

    if(session.username){
      const arregloAuto = await this.appService.buscarAutos2(auto.chasis, auto.nombreModelo);
      res.render('verAuto', {
        nombre: session.username,idUsuario:auto.idUsuario, arrayAuto: arregloAuto
      });
    }else{
      res.redirect('iniciarSesion');
    }
  }


  @Get('/verAutoConductor/:idUsuario')
  async verCurso(@Session() session,
                 @Param() param,
                 @Res() res){
    const arregloAuto = await this.appService.buscarAutos({
      relations: ["usuarios"],
      where: {usuarios: {idUsuario: param.idUsuario}}
    });
    if(session.username){
      res.render('verAutoConductor',{
        nombre:session.username,arrayAuto:arregloAuto});
    }else{
      res.redirect('/examne/iniciarSesion');
    }
  }

  @Get('/editar/:idAuto')
  async editarAutos(@Session() session,
                    @Res() res,
                    @Param() param) {
    const arregloAuto = await this.appService.editar(param.idAuto);
    if(session.username){
      res.render('editarAuto', {
        nombre:session.username,
        arrayAuto:arregloAuto});
    }else{
      res.redirect('/examne/iniciarSesion');
    }
  }


  @Post('/editar')
  async editarAutoPost(
                        @Body() auto: Auto,
                        @Res() res,


  ) {
    auto.usuarios= Number(auto.usuarios);
    auto.chasis = Number(auto.chasis);
    auto.anio = Number(auto.anio);
    auto.costo = Number(auto.costo);
    let autoAValidar = new AutoUpdateDto();
    autoAValidar.chasis = auto.chasis;
    autoAValidar.nombreMarca = auto.nombreMarca;
    autoAValidar.colorUno = auto.colorUno;
    autoAValidar.colorDos = auto.colorDos;
    autoAValidar.nombreModelo = auto.nombreModelo;
    autoAValidar.anio = auto.anio;
    autoAValidar.costo = auto.costo;

    try {
      const errores = await validate(autoAValidar);
      console.log(errores);
      console.log(autoAValidar);
      console.log(auto);
      if (errores.length > 0) {
        console.error(errores);
        res.redirect('/examen/crearAuto');
      } else {
        const respuestaEditar = await this.appService.editar(auto.idAuto); //promesa
        respuestaEditar.chasis = auto.chasis;
        respuestaEditar.nombreMarca = auto.nombreMarca;
        respuestaEditar.colorUno = auto.colorUno;
        respuestaEditar.colorDos = auto.colorDos;
        respuestaEditar.nombreModelo = auto.nombreModelo;
        respuestaEditar.anio = auto.anio;
        respuestaEditar.costo = auto.costo;
        await this.appService.editarAuto(respuestaEditar);
        console.log('Respues: ', respuestaEditar);
        res.redirect('/examen/bienvenida');
      }

    } catch (e) {
      console.error(e);
      res.status(500);
      res.send({mensaje: 'Error', codigo: 500});
    }

    console.log(auto);
  }

}
