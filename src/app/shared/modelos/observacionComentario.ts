export class ObservacionComentario{
    id_aut_comentario:number;
    pregunta:string;
    pregunta_padre?:number;

    constructor(){
        this.id_aut_comentario=0;
        this.pregunta='';
        this.pregunta_padre=0;
    }
}