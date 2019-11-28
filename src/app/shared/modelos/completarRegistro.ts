import { Referido } from './referido';
import { Experiencia } from './experiencia';

export class CompletarRegistro{
    num_hijos?: number;
    referidos:Referido[]
    ha_trabajado: boolean;
    exp_pasadas: Experiencia[];
    trabajo_actualmente:boolean;
    exp_actuales: Experiencia[];

    constructor()
    {
        this.num_hijos = 0;
        this.referidos = new Array<Referido>();
        this.ha_trabajado = false;
        this.exp_pasadas = new Array<Experiencia>();
        this.trabajo_actualmente = false;
        this.exp_actuales = new Array<Experiencia>();
    }
}