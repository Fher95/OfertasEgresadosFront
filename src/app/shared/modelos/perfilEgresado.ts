import { CiudadInterface } from './ciudadesInterface';
import { DiscapacidadInterface } from './discapacidadInterface';
import { Experiencia } from './experiencia';
import { Referido } from './referido';
import { Grado } from './grado';
import { Localizacion } from './localizacion';

export class PerfilEgresado{
    id_aut_egresado:number;
    nombres:string;
    apellidos:string;
    identificacion:number;
    estado:string;
    grupo_etnico:string;
    genero:string;
    correo:string;
    correo_alternativo:string;
    estado_civil:string;
    celular:string;
    grados:Grado[];
    referidos:Referido[];
    trabajoActual:Experiencia[];
    telefono_fijo:number;
    lugarNacimiento:CiudadInterface;
    lugarResidencia:Localizacion;
    discapacidades:DiscapacidadInterface[];

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