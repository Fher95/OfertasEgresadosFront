import { SolicitudModel } from './solicitud.model';
import { ExperienciaModel } from './experiencia.model';
import { ReferenciaPersonalModel } from './referencia-personal.model';
import { GradoModel } from './grado.model';
import { LocalizacionModel } from './localizacion.model';
import { CiudadModel } from './ciudad.model';
import { DiscapacidadInterface } from './discapacidadInterface';

export class EgresadoModel {
  constructor(
    public id?: number,
    public nombres?: string,
    public apellidos?: string,
    public identificacion?: string,
    public estado?: string,
    public grupoEtnico?: string,
    public genero?: string,
    public correo?: string,
    public correoAlternativo?: string,
    public estadoCivil?: string,
    public celular?: string,
    public tituloEspecial?: string,
    public telefonoFijo?: string,
    public lugarNacimiento?: CiudadModel,
    public lugarResidencia?: LocalizacionModel,
    public lugarExpedicion?: CiudadModel,
    public grados?: GradoModel[],
    public referenciasPersonales?: ReferenciaPersonalModel[],
    public trabajosActuales?: ExperienciaModel[],
    public solicitudes?: SolicitudModel[],
    public discapacidades?: DiscapacidadInterface[],
  ) {}
}
