import { IsNotEmpty, IsString, IsNumber, IsOptional} from "class-validator";

export class AutoUpdateDto {
    @IsOptional()
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
    @IsOptional()
    usuarios: number;

}