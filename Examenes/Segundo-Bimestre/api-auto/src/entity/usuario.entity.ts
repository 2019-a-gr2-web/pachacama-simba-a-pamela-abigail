import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {rolEntity} from "./rol.entity";
import {autoEntity} from "./auto.entity";
import {pedidoEntity} from "./registroPedido.entity";

@Entity('usuario') // Nombre tabla
export class usuarioEntity {

    @PrimaryGeneratedColumn()
    idUsuario:number;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'nombre',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'apellido',
    })
    apellido: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'cedula-ruc',
    })
    cedula: string;

    @Column({
        type: 'date',
        name: 'fecha-nacimiento',
        default: '2019-07-30'
    })
    fechaNacimiento: Date;

    @Column({
        type: 'int',
        name: 'numero-autos',
    })
    numeroAutos: number;

    @Column({
        type: 'boolean',
        name: 'licencia-valida',
    })
    licenciaValida: boolean;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'direccion',
    })
    direccion: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'telefono',
    })
    telefono: string;



    @Column({
        type: 'varchar',
        length: 20,
        name: 'password',
    })
    password: string;

    @ManyToOne(type => rolEntity, rol => rol.usuarios)
    rolId: rolEntity;

    @OneToMany(type => autoEntity, auto => auto.usuarios)
    autoId: usuarioEntity[];

    @OneToMany(type => pedidoEntity, pedido => pedido.usuarioId)
    pedidos: usuarioEntity[];

}