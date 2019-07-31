import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {usuarioEntity} from "./entity/usuario.entity";
import {autoEntity} from "./entity/auto.entity";
import {Auto} from "./interfaces/auto";
import {Trago} from "../../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/interfaces/trago";


@Injectable()
export class AppService {
  constructor(@InjectRepository(usuarioEntity)
              private readonly _usuarioRepository: Repository<usuarioEntity>,
              @InjectRepository(autoEntity)
              private readonly _autoRepository: Repository<autoEntity>,
              ){
  }


  crearAuto(nuevoAuto:Auto): Promise<autoEntity>{

    // @ts-ignore
    const objetoEntidad = this._autoRepository.create(nuevoAuto);
    return this._autoRepository.save(objetoEntidad); //promesa
  }

  buscar(parametrosBusqueda?):Promise<usuarioEntity[]>{
    return this._usuarioRepository.find(parametrosBusqueda);
  }

  buscarAutos(parametrosBusqueda?):Promise<autoEntity[]>{
    return this._autoRepository.find(parametrosBusqueda);
  }
  buscarAutos2(parametrosBusqueda?, nombreModelo?):Promise<autoEntity[]>{
    if(parametrosBusqueda!=""&& nombreModelo!=""){
      return this._autoRepository.find({
        chasis:parametrosBusqueda,
        nombreModelo:nombreModelo
      });
    }else{
      if(parametrosBusqueda==""&& nombreModelo!=""){
        return this._autoRepository.find({
          chasis:parametrosBusqueda
        });
      }else if(parametrosBusqueda!=""&& nombreModelo==""){
        return this._autoRepository.find({
          chasis:parametrosBusqueda,
        });
      }else{
        return this._autoRepository.find();
      }
    }
  }

  editar(idParaEditar):Promise<autoEntity>{
    return this._autoRepository.findOne(idParaEditar);
  }

  editarAuto(editar: autoEntity):Promise<autoEntity>{
    return this._autoRepository.save(editar);

  }
  async eliminarPorId(idAuto: number):Promise<autoEntity>{
    let objetoEntidad =await this._autoRepository.findOne(idAuto);
    return this._autoRepository.remove(objetoEntidad);
  }


}
