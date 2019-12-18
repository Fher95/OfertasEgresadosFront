import { CargoModel } from './cargo.model';
export interface ExperienciaModel {
  id?: number;
  cargo?: CargoModel;
  nombreEmpresa?: string;
  sector?: string;
}
