import { Referido } from './referido';
import { Experiencia } from './experiencia';

export class CompletarRegistro{
    num_hijos?: number;
    esposo: Referido;
    madre: Referido;
    padre: Referido;
    ha_trabajado: number;
    exp_pasada: Experiencia;
    trabajo_actualmente:number;
    exp_actual: Experiencia;

    constructor()
    {
        this.num_hijos = 0;
        this.esposo = new Referido();
        this.madre = new Referido();
        this.padre = new Referido();
        this.ha_trabajado = 0;
        this.exp_pasada = new Experiencia();
        this.trabajo_actualmente = 0;
        this.exp_actual = new Experiencia();
    }
}