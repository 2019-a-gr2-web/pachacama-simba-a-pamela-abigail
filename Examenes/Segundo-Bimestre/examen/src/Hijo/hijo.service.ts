import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { autoEntity } from "./hijo.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductosService {
    recnum = 1;
    constructor(@InjectRepository(autoEntity)
    private readonly _productoRepository: Repository<autoEntity>, ) {
    }

    listaProductos(id): Promise<autoEntity[]> {
        return this._productoRepository.find({
            where: { productoId: id }
        });
    }

    crear(nuevoProducto: autoEntity):Promise<autoEntity>{
        const objetoEntidad = this._productoRepository.create(nuevoProducto);
        return this._productoRepository.save(objetoEntidad);
    }

    eliminarPorId(id?:number):Promise<object>{
        return this._productoRepository.delete({
            materiaId:id
        });
    }
    async editar(ProductoModificado:autoEntity):Promise<Object>{
        
        const ProductoActual = await this._productoRepository.findOne(ProductoModificado.materiaId);
        console.log("Producto Actual: ", ProductoActual);
        console.log("Producto Nuevo: ", ProductoModificado);
        ProductoModificado.materiaId = ProductoActual.materiaId;
        return this._productoRepository.save(ProductoModificado);

    }

    buscar(parametrosBusquedaNombre?,fechaBusqueda?):Promise<autoEntity[]>{
        if(parametrosBusquedaNombre!=""&&fechaBusqueda!=""){
            return this._productoRepository.find({
                nombre:parametrosBusquedaNombre,
                codigo:fechaBusqueda
            });
        }else{
            if(parametrosBusquedaNombre==""&& fechaBusqueda !=""){
                return this._productoRepository.find({
                    nombre:parametrosBusquedaNombre
                });
            }else if(parametrosBusquedaNombre!="" && fechaBusqueda==""){
                return this._productoRepository.find({
                    nombre:parametrosBusquedaNombre
                });
            }else{
                return this._productoRepository.find();
            }
        }
    }
    buscarXid(id?:number):Promise<autoEntity[]>{
        return this._productoRepository.find({
            materiaId:id
        });
    }

    listarTodo():Promise<autoEntity[]>{
        return this._productoRepository.find();
    }
}