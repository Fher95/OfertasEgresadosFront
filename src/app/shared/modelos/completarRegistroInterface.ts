export interface CompletarRegistroInterface{
    num_hijos?: number;
    esposo:{
        nombres?:string;
        id_nivel_educativo?:number;
        telefono_movil?:number;
        correo?:string;
        parentesco?:string;
        id_aut_programa?:number;
        es_egresado?:boolean;
    }
    madre:{
        nombres?:string;
        id_nivel_educativo?:number;
        telefono_movil?:number;
        correo?:string;
        parentesco?:string;
        id_aut_programa?:number;
        es_egresado?:boolean;
    }
    padres:{
        nombres?:string;
        id_nivel_educativo?:number;
        telefono_movil?:number;
        correo?:string;
        parentesco?:string;
        id_aut_programa?:number;
        es_egresado?:boolean;
    }
    ha_trabajado?:boolean;
    exp_pasada:{
        
    }
    exp_actual:{

    }
    trabajo_actualmente?:boolean;
}