import { DepartamentoModel } from './departamento.model';
export interface CiudadModel {
  id?: number;
  nombre?: string;
  departamento?: DepartamentoModel;
}
