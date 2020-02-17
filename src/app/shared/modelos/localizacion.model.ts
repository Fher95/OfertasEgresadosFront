import { CiudadModel } from './ciudad.model';
export interface LocalizacionModel {
  id?: number;
  ciudad?: CiudadModel;
  direccion?: string;
}
