import { PaisModel } from './pais.model';
export interface DepartamentoModel {
  id?: number;
  nombre?: string;
  pais?: PaisModel;
}
