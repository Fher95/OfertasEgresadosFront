import { Referido } from './referido';
import { Experiencia } from './experiencia';

export class CompletarRegistro{
    num_hijos?: number;
    referidos:Referido[]
    ha_trabajado: boolean;
    experiencias: Experiencia[];
    trabajo_actualmente:boolean;

    constructor()
    {
        this.num_hijos = 0;
        this.referidos = new Array<Referido>();
        this.ha_trabajado = false;
        this.experiencias = new Array<Experiencia>();
        this.trabajo_actualmente = false;
    }
}