import { Referido } from './referido';
import { Experiencia } from './experiencia';

export class CompletarRegistro{
    referidos:Referido[]
    ha_trabajado: boolean;
    expAnterior?: Experiencia[];
    expActual?: Experiencia[];
    trabajo_actualmente:boolean;

    constructor()
    {
        this.referidos = new Array<Referido>();
        this.ha_trabajado = false;
        this.expAnterior = new Array<Experiencia>();
        this.expActual = new Array<Experiencia>();
        this.trabajo_actualmente = false;
    }
}