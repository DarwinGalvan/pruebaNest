import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { response } from 'express';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    
    constructor(private mensajesServices:MensajesService){

    }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response){
    this.mensajesServices.createMensaje(createMensajeDto).then( mensaje => {
        response.status(HttpStatus.CREATED).json(mensaje);
    }).catch(() => {
        response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la creacion del mensaje'});
    });
}

    @Get()
    getAll(@Res() response){
        this.mensajesServices.getAll().then(mensajesList =>{
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la obtencion del mensaje'});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje ){
       this.mensajesServices.updateMensaje(idMensaje, updateMensajeDto).then(
           response.status(HttpStatus.OK).json(Mensaje)
       ).catch(()=>{
        response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la actualizacion del mensaje'});
       });
    }
    @Delete('id')
    delete(@Res() response, @Param('id') idMensaje){
        this.mensajesServices.deleteMensaje(idMensaje).then(res =>{
            response.status(HttpStatus.OK).json(res);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la Eliminacion del mensaje'});
        });
    }
}

