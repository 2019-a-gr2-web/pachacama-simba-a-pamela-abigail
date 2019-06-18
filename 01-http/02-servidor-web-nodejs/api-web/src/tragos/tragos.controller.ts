import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragosController{
    constructor(private readonly _tragosService:TragosService){

    }
    @Get('lista')
    async listarTragos(
        @Res() res
    ){
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
    }

    @Get('crear')
    crearTrago(
        @Res() res
    ){
        res.render('tragos/crear-editar')
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago:Trago,
        @Res() res
        //@Body('nombre') nombre:string,
        //@Body('tipo') tipo:string,
        //@Body('gradosAlcohol') gradosAlcohol:number,
        //@Body('fechaCaducidad') fechaCaducidad:Date,
        //@Body('precio') precio:number,

    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio =Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        try{
            const respuestaCrear = await this._tragosService.crear(trago);
            console.log('Respues: ', respuestaCrear);
            res.redirect('/api/traguito/lista');
        }catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo:500});
        }

        console.log(trago);
        //console.log('Trago: ', trago, typeof trago);
        //console.log('nombre: ', nombre, typeof nombre);
        //console.log('tipo: ', tipo, typeof tipo);
        //console.log('gradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        //console.log('fechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        //console.log('precio: ', precio, typeof precio);
    }

    @Post('eliminar')
    eliminarTrago(
        @Body() trago:Trago,
        @Res() res,
    ){
        trago.id=Number(trago.id)
        this._tragosService.eliminarPorId(trago.id);
        res.redirect('/api/traguito/lista');
        console.log(trago);

    }
    }