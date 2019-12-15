import { CiudadInterface } from './ciudadesInterface';
import { DiscapacidadInterface } from './discapacidadInterface';
import { Localizacion } from './localizacion';
import { Experiencia } from './experiencia';
import { Referido } from './referido';

export class PerfilEgresado{
    nombres:string;
    apellidos:string;
    estado:string;
    identificacion:number;
    //Dpt,País 
    lugarExpedicion:CiudadInterface;
    lugarNacimiento:CiudadInterface;
    genero:string;
    correo_alternativo:string;
    celular:string;
    grupo_etnico:string;
    discapacidades:DiscapacidadInterface[];
    estado_civil:string;
    lugarResidencia:Localizacion;
    correo:string;
    telefono_fijo:number;
    //Grados
    referidos:Referido[];
    trabajoActual:Experiencia[];

    constructor(){

    }
}