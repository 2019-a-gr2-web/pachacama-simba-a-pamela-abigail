import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { conductorEntity} from "./padre.entity";
import { Repository } from "typeorm";

@Injectable()
export class TiendaService {
    constructor(@InjectRepository(conductorEntity)
    private readonly _tiendaRepository: Repository<conductorEntity>) {
    }
    findAll():Promise<conductorEntity[]>{
        return this._tiendaRepository.find();
    }
}