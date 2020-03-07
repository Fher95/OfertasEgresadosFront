import { ProgramaModel } from './programa.model';

export interface ReferenciaPersonalModel {
  id?: string;
  nombre?: string;
  correo?: string;
  parentesco?: string;
  telefonoMovil?: string;
  esEgresado?: boolean;
  programa?: ProgramaModel;
}
