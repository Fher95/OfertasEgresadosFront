import { Referido } from './referido';
import { Experiencia } from './experiencia';
import { Comentario } from './comentario';
import { GradoAdicional } from './gradoAdicional';

export class CompletarRegistro{
    referidos:Referido[];
    expActual?: Experiencia[];
    trabajo_actualmente:boolean;
    comentarios:Comentario[];
    gradoAdicional?:GradoAdicional;
    
    constructor()
    {
        this.referidos = new Array<Referido>();
        this.expActual = new Array<Experiencia>();
        this.trabajo_actualmente = false;
        this.comentarios = new Array<Comentario>();
        this.gradoAdicional = new GradoAdicional;
    }
}