export class Referido{
    nombres:string;
    parentesco:string;
    es_egresado:number;
    id_nivel_educativo?:number;
    id_aut_programa?:number;
    telefono_movil:number;
    correo:string;

    constructor()
    {
        this.nombres="";
        this.parentesco="";
        this.id_nivel_educativo=0;
        this.id_aut_programa=0;
        this.telefono_movil=0;
        this.correo="";
        this.es_egresado=0;
    }
    
}