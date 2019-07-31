import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {pedidoEntity} from "./registroPedido.entity";
import {autoEntity} from "./auto.entity";

@Entity('detalle') // Nombre tabla
export class detalleEntity {
    @PrimaryGeneratedColumn()
    detalleId: number;

    /*  @Column({
          default: 1,
      })
      cantidad:number;
    */
    @ManyToOne(
        type => autoEntity,
        producto => producto.pedido
    )
    prodcutoId: autoEntity;

    @ManyToOne(type => pedidoEntity,
        pedido => pedido.detalles)
    pedidoId: pedidoEntity;
}