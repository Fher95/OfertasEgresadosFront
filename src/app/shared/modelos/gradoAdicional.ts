import { Comentario } from './comentario';

export class GradoAdicional{
    id_aut_programa:number;
    titulo_especial?:string;
    mencion_honor?:string;
    comentarios:Comentario[];

    constructor()
    {
        this.id_aut_programa=0;
        this.titulo_especial='';
        this.mencion_honor='';
        this.comentarios = new Array<Comentario>();
    }
    
}