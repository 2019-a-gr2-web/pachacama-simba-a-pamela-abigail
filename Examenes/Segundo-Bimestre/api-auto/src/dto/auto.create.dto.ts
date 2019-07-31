import {IsEmpty, IsNotEmpty, IsString, IsNumber} from "class-validator";

export class AutoCreateDto {
    @IsEmpty()
    idAuto:number;

    @IsNotEmpty()
    @IsNumber()
    chasis: number;

    @IsNotEmpty()
    @IsString()
    nombreMarca: string;

    @IsNotEmpty()
    @IsString()
    colorUno: string;

    @IsNotEmpty()
    @IsString()
    colorDos: string;

    @IsNotEmpty()
    @IsString()
    nombreModelo: string;

    @IsNotEmpty()
    @IsNumber()
    anio: number;

    @IsNotEmpty()
    @IsNumber()
    costo: number;

    @IsNumber()
    @IsNotEmpty()
    usuarios: number;

}