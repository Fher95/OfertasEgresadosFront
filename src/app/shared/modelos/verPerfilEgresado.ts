import { SolicitudModel } from './solicitud.model';
import { ExperienciaModel } from './experiencia.model';
import { GradoModel } from './grado.model';
import { LocalizacionModel } from './localizacion.model';
import { CiudadModel } from './ciudad.model';
import { Referido } from './referido';
import { Experiencia } from './experiencia';

export class VerPerfilEgresado {
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
    public telefonoFijo?: string,
    public lugarNacimiento?: CiudadModel,
    public lugarResidencia?: LocalizacionModel,
    public grados?: GradoModel[],
    public referenciasPersonales?: Referido[],
    public trabajosActuales?: Experiencia[],
    public estado_completar?:boolean
  ) {}
}
