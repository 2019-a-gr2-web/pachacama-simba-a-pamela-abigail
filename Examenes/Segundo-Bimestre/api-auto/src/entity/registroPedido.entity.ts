import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {usuarioEntity} from "./usuario.entity";
import {detalleEntity} from "./detalle.entity";

@Entity('pedido') // Nombre tabla
export class pedidoEntity {


    @PrimaryGeneratedColumn()
    pedidoId:number;

    @Column({
        length:'300'
    })
    nombre:string;

    @Column({
        length:'300'
    })
    direccion:string;

    @Column({
        length:'300'
    })
    telefono:string;

    @Column({
        length:'300'
    })
    cedula:string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable:true
    })
    totalSinImpuestos: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        nullable:true
    })
    totalPedido: number;

    @Column({
        type:'int',
        default:1//iniciado
    })
    estado: number;

    @OneToMany(type => detalleEntity,
        detalle=> detalle.pedidoId)
    detalles:detalleEntity[];

    @ManyToOne(type => usuarioEntity,
        usuario=> usuario.pedidos)
    usuarioId:usuarioEntity;


}