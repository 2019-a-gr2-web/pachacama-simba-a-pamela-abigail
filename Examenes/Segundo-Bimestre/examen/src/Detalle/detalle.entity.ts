import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { autoEntity } from "../Hijo/hijo.entity";
import { PedidoEntity } from "../Pedido/pedido.entity";

@Entity('detalle')
export  class DetalleEntity {

    @PrimaryGeneratedColumn()
    detalleId:number;

  /*  @Column({
        default: 1,
    })
    cantidad:number;
*/
    @ManyToOne(
        type => autoEntity,
        producto=> producto.detalles
        )
        prodcutoId:autoEntity;

    @ManyToOne(type => PedidoEntity,
        pedido=> pedido.detalles)
    pedidoId:PedidoEntity;

}