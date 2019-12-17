export class Grado{
    tipo_grado:string;
    mencion_honor:string;
    titulo_especial:string;
    anio_graduacion:string;
    fecha_graduacion:Date;
    id_aut_programa:number;
    estado:string;

    constructor(){
        this.tipo_grado='';
        this.mencion_honor='';
        this.titulo_especial='';
        this.anio_graduacion='';
        this.fecha_graduacion=new Date();
        this.id_aut_programa=0;
        this.estado='';
    }
}