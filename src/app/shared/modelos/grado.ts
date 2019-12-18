import { ProgramaInterface } from './programaInteface';

export class Grado{
    id_aut_grado:number;
    tipo_grado:string;
    mencion_honor:string;
    titulo_especial:string;
    anio_graduacion:string;
    fecha_graduacion:Date;
    programa:ProgramaInterface;
    estado:string;

    constructor(){
        this.id_aut_grado=0;
        this.tipo_grado='';
        this.mencion_honor='';
        this.titulo_especial='';
        this.anio_graduacion='';
        this.fecha_graduacion=new Date();
        this.estado='';
    }
}