import { EgresadoVerificar } from './egresadosVerificarInterface';

export class RespuestaVerificarExcel{
    constructor(
        public aceptados: EgresadoVerificar[],
        public pendientes: EgresadoVerificar[],        
        public rechazados: EgresadoVerificar[]
    ){}
}