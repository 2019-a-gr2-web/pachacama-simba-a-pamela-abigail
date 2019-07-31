import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ChatModule} from "./chat/chat.module";
import {usuarioEntity} from "./entity/usuario.entity";
import {rolEntity} from "./entity/rol.entity";
import {autoEntity} from "./entity/auto.entity";
import {pedidoEntity} from "./entity/registroPedido.entity";
import {detalleEntity} from "./entity/detalle.entity";

@Module({
  imports: [
   TypeOrmModule.forRoot({
     name: 'default', // nombre cadena conexion por defecto de typeorm
     type: 'mysql',
     host: 'localhost',
     port: 3306,
     username: 'root',
     password: 'root',
     database: 'examen',
     entities: [
         usuarioEntity,
         rolEntity,
         autoEntity,
         detalleEntity,
         pedidoEntity

     ],
     synchronize: true,
       dropSchema: false
   }),TypeOrmModule.forFeature(
          [
              usuarioEntity,rolEntity,autoEntity,detalleEntity,pedidoEntity
          ],
          'default'
      ),
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

