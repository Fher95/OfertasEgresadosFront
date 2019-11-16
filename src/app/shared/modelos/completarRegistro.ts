import { Referido } from './referido';
import { Experiencia } from './experiencia';

export class CompletarRegistro{
    num_hijos?: number;
    referidos:Referido[]
    ha_trabajado: number;
    exp_pasadas: Experiencia[];
    trabajo_actualmente:number;
    exp_actuales: Experiencia[];

    constructor()
    {
        this.num_hijos = 0;
        this.referidos = new Array<Referido>();
        this.ha_trabajado = 0;
        this.exp_pasadas = new Array<Experiencia>();
        this.trabajo_actualmente = 0;
        this.exp_actuales = new Array<Experiencia>();
    }
}