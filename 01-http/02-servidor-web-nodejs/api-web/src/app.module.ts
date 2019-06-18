import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModules} from "./tragos/tragos.modules";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";
import {FiestaEntity} from "./fiesta/fiesta.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";

@Module({
  imports: [
      TragosModules,
      DistribuidorModule,
      FiestaModule,
    TypeOrmModule.forRoot({
      name: 'default', // nombre cadena conexion por defecto de typeorm
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [
          TragosEntity,
          DistribuidorEntity,
          FiestaEntity

      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
