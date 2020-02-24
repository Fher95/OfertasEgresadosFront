export class Referido{
    nombres:string;
    parentesco:string;
    es_egresado:boolean;
    id_nivel_educativo?:number;
    id_aut_programa?:number;
    id_aut_titulo?:number;
    telefono_movil:number;
    correo:string;
    tipoActualizacion?:number;

    constructor()
    {
        this.nombres="";
        this.parentesco="";
        this.id_nivel_educativo=0;
        this.id_aut_programa=0;
        this.id_aut_titulo=0;
        this.telefono_movil=0;
        this.correo="";
        this.es_egresado=false;
        this.tipoActualizacion=0;
    }
    
}