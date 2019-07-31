import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {rolEntity} from "./rol.entity";
import {usuarioEntity} from "./usuario.entity";
import {pedidoEntity} from "./registroPedido.entity";
import {detalleEntity} from "./detalle.entity";

@Entity('auto') // Nombre tabla
export class autoEntity {

    @PrimaryGeneratedColumn()
    idAuto:number;

    @Column({
        type: 'int',
        name: 'chasis',
    })
    chasis: number;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'nombre-marca',
    })
    nombreMarca: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'color-uno',
    })
    colorUno: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'color-dos',
    })
    colorDos: string;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'nombre-modelo',
    })
    nombreModelo: string;

    @Column({
        type: 'int',
        name: 'anio',
    })
    anio: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'costo',
    })
    costo: number;

    @ManyToOne(type => usuarioEntity, usuario => usuario.autoId)
    usuarios: rolEntity;

    @OneToMany(type => detalleEntity, pedido => pedido.pedidoId)
    pedido: usuarioEntity[];
}