import { CiudadModel } from './ciudad.model';
import { CargoModel } from './cargo.model';
export interface ExperienciaModel {
  id?: number;
  cargo?: CargoModel;
  nombreEmpresa?: string;
  sector?: string;
  fechaInicio?: string;
  tipoContrato?: string;
  ciudad?: CiudadModel;
  direccionEmpresa?: string;
  rangoSalario?: string;
  telefonoTrabajo?: string;
  trabajaEnSuArea?: boolean;
}
