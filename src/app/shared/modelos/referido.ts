export class Referido{
    nombres:string;
    id_nivel_educativo?:number;
    telefono_movil:number;
    correo:string;
    parentesco:string;
    id_aut_programa?:number;
    es_egresado:number;

    constructor()
    {
        this.nombres="";
        this.id_nivel_educativo=0;
        this.telefono_movil=0;
        this.correo="";
        this.parentesco="";
        this.id_aut_programa=0;
        this.es_egresado=0;
    }
    
}