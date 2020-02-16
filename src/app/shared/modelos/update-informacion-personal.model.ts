export interface UpdateInformacionPersonalModel {
  nombres?: string;
  apellidos?: string;
  grupoEtnico?: string;
  identificacion?: string;
  estadoCivil?: string;
  idCiudadNacimiento?: number;
  idCiudadResidencia?: number;
  direccionResidencia?: string;
  genero?: string;
  correo?: string;
  correoAlternativo?: string;
  telefonoFijo?: string;
  celular?: string;
  discapacidades?: number[];
}
