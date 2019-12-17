import { CiudadInterface } from './ciudadesInterface';
import { DiscapacidadInterface } from './discapacidadInterface';
import { Localizacion } from './localizacion';
import { Experiencia } from './experiencia';
import { Referido } from './referido';
import { Grado } from './grado';
import { Local } from 'protractor/built/driverProviders';

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
    grados:Grado[];
    referidos:Referido[];
    trabajoActual:Experiencia[];

    constructor(){
        this.nombres='';
        this.apellidos='';
        this.estado='';
        this.identificacion=0;
        this.genero='';
        this.correo_alternativo='';
        this.celular='';
        this.grupo_etnico='';
        this.discapacidades= new Array<DiscapacidadInterface>();
        this.estado_civil='';
        this.lugarResidencia= new Localizacion();
        this.correo='';
        this.telefono_fijo=0;
        this.grados= new Array<Grado>();
        this.referidos= new Array<Referido>();
        this.trabajoActual= new Array<Experiencia>();
    }
}