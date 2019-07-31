import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { autoEntity } from "../Hijo/hijo.entity";

@Entity('conductor')
export class conductorEntity{
    @PrimaryGeneratedColumn()
    conductorId:number;

    @Column({
        length:100,
    })
    nombres:string;

    @Column({
        length:100,
    })
    apellidos:string;

    @Column({
        default:'2019-07-30',
    })
    fechaNacimiento:Date;

    @Column({

        length:2,
    })
    numeroAutos: string; //number se sale del rango

    @Column({
        default:true,
    })
    licenciaValida: boolean
    
    @OneToMany(
        type => autoEntity,
        producto => producto.TiendaId
        )
        productos:autoEntity[];
    
}