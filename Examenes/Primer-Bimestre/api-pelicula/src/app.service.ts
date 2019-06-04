import { Injectable } from '@nestjs/common';
import {Actor} from "./interfaces/actor";
import {Peliculas} from "./interfaces/pelicula";


@Injectable()
export class AppService {
  bddActores: Actor[] = [];
  bddPeliculas: Peliculas[] = [];
  recnum = 1;
  recnum2 = 1;
  constructor() {
      const actor: Actor = {
          nombre: 'Leonardo  Wilhelm',
          apellido: 'DiCaprio',
          fechaNacimiento: new Date(1974, 11, 11),
          numeroPeliculas: 35,
          retirado: false
      };
      this.crear(actor);

      const pelicula :Peliculas ={
          nombre:'Titanic',
          anioLanzamineto: 1997,
          rating:35,
          actoresPrincipales:('Leonardo DiCaprio, Kate Winslet'),
          sinopsis: 'Mejor pelicula en 1997',
          idActor: 1
      };
      this.crearPelicula(pelicula);

  }


  crear(nuevoActor: Actor): Actor{
    nuevoActor.idActor = this.recnum;
    this.recnum++;
    this.bddActores.push(nuevoActor);
    return nuevoActor;
  }
    crearPelicula(nuevaPelicula: Peliculas): Peliculas{
        nuevaPelicula.idPelicula = this.recnum2;
        this.recnum2++;
        this.bddPeliculas.push(nuevaPelicula);
        return nuevaPelicula;
    }
    peli(idActor: number): Peliculas[] {
        const id = Number(idActor);
        return this.bddPeliculas.filter((pelicula) => {
            return pelicula.idActor === id;
        });
        return this.bddPeliculas;
    }
  buscarPorId(id: number): Actor {
    return this.bddActores.find(
        (actor) => {
          return actor.idActor === id;
        }
    );
  }
  buscarPorNombre(nombre: string): Actor[] {
    return  this.bddActores.filter(
        (actor) => {
          return actor.nombre.toUpperCase().includes(nombre.toUpperCase());
        }
    );

  }
    buscarPorNombrePeli(nombre: string): Peliculas[] {
        return this.bddPeliculas.filter(
            (pelicula) => {
                return pelicula.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );

    }

  eliminarPorId(id: number): Actor[] {
    const indice = this.bddActores.findIndex(
        (actor) => {
          return actor.idActor === id
        }
    );
    this.bddActores.splice(indice,1);
    return this.bddActores;
  }
    eliminarPorIdPeli(id: number ): Peliculas[] {
        const indice = this.bddPeliculas.findIndex(
            (pelicula) => {
                return pelicula.idPelicula === id
            }
        );
        this.bddPeliculas.splice(indice,1);
        return this.bddPeliculas;
    }


}
