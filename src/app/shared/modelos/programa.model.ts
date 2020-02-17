import { NivelesEstudioInterface } from './nivelesEstudioInterface';
import { SedeInterface } from './sedeInterface';
import { FacultadInterface } from './facultadInterface';
export interface ProgramaModel {
  idPrograma?: number;
  Nombre?: string;
  facultad?: FacultadInterface;
  sede?: SedeInterface;
  titulo?: string;
  nivelEstudio?: NivelesEstudioInterface;
}
