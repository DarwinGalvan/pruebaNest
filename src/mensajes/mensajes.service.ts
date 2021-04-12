import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(Mensaje)
        private mensajesRepository: Repository<Mensaje>,
      ) {}

      async getAll():Promise<Mensaje[]>{
        return await this.mensajesRepository.find();
      }

      async createMensaje(mensajeNuevo:CreateMensajeDto):Promise<Mensaje>{
          const nuevo = new Mensaje();
          nuevo.Mensaje = mensajeNuevo.mensaje;
          nuevo.nick = mensajeNuevo.nick;

          return this.mensajesRepository.save(nuevo);
      }

      async updateMensaje(idMensaje:number, mensajeActualizar:CreateMensajeDto):Promise<Mensaje>{
          const mensajeUpdate = await this.mensajesRepository.findOne(idMensaje);
          mensajeUpdate.nick = mensajeActualizar.nick;
          mensajeUpdate.Mensaje = mensajeActualizar.mensaje;

          return await this.mensajesRepository.save(mensajeUpdate);
      }

      async deleteMensaje(idMensaje:number):Promise<any>{
        return await this.mensajesRepository.delete(idMensaje);
      }
}
