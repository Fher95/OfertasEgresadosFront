import { ObservacionModel } from './observacion.model';
import { ProgramaModel } from './programa.model';
import { ComentaModel } from './comenta.model';
import { TituloInterface } from './tituloInterface.';

export interface GradoModel {
  id?: number;
  programa?: ProgramaModel;
  mencion_honor?: string;
  estado?: string;
  fechaGrado?: Date | string;
  comentarios?: ComentaModel;
  titulo?: TituloInterface
}
