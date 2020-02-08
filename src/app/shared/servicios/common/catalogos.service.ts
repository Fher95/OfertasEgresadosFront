import { ServicioModel } from './../../modelos/servicio.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../../modelos/paisInterface';
import { DepartamentoInterface } from '../../modelos/departamentoInterface';
import { CiudadInterface } from '../../modelos/ciudadesInterface';
import { FacultadInterface } from '../../modelos/facultadInterface';
import { ProgramaInterface } from '../../modelos/programaInteface';
import { DiscapacidadInterface } from '../../modelos/discapacidadInterface';
import { NivelesEstudioInterface } from '../../modelos/nivelesEstudioInterface';
import { SedeInterface } from '../../modelos/sedeInterface';
import { SolicitudInterface } from '../../modelos/solicitudeInterface';
import { EventoInterface } from '../../../shared/modelos/evento';
import { TituloInterface } from '../../../shared/modelos/tituloInterface.';

const baseUrl = 'http://localhost:8081/api/';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  constructor(private http: HttpClient) {}

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${baseUrl}paises`);
  }

  getDepartamentosBy(paisId: number): Observable<DepartamentoInterface[]> {
    return this.http.get<DepartamentoInterface[]>(
      `${baseUrl}departamentos/${paisId}`
    );
  }

  getCiudadesBy(departamentoId: number): Observable<CiudadInterface[]> {
    return this.http.get<CiudadInterface[]>(
      `${baseUrl}ciudades/${departamentoId}`
    );
  }

  getNivelEducativo(): Observable<NivelesEstudioInterface[]> {
    return this.http.get<ProgramaInterface[]>(`${baseUrl}nivelesPrograma`);
  }

  getNivelAcademico(): Observable<NivelesEstudioInterface[]> {
    return this.http.get<NivelesEstudioInterface[]>(`${baseUrl}nivelesEstudio`);
  }

  getSede(): Observable<SedeInterface[]> {
    return this.http.get<SedeInterface[]>(`${baseUrl}sedes`);
  }

  getFacultad(): Observable<FacultadInterface[]> {
    return this.http.get<FacultadInterface[]>(`${baseUrl}facultades`);
  }

  getPrograma(
    idSede: number,
    idFacultad: number,
    idNivelEstudio: number
  ): Observable<ProgramaInterface[]> {
    return this.http.get<ProgramaInterface[]>(
      `${baseUrl}programas/${idSede}/${idFacultad}/${idNivelEstudio}`
    );
  }

  getTitulo(idPrograma: number): Observable<TituloInterface[]> {
    return this.http.get<ProgramaInterface[]>(
      `${baseUrl}titulos/${idPrograma}`
    );
  }

  getServicios(): Observable<ServicioModel[]> {
    return this.http.get<ServicioModel[]>(`${baseUrl}servicios`);
  }

  getDiscapacidad(): Observable<DiscapacidadInterface[]> {
    return this.http.get<DiscapacidadInterface[]>(`${baseUrl}discapacidades`);
  }

  getSolicitudesCarnet(): Observable<SolicitudInterface[]> {
    return this.http.get<SolicitudInterface[]>(`${baseUrl}carnetizacion`);
  }

  getEstadoEgresado(idEgresado: number): Observable<any> {
    console.log(idEgresado);
    return this.http.get(`${baseUrl}validarEstado/${idEgresado}`);
  }

  getEstadoInformacionEgresado(idEgresado: number): Observable<any> {
    return this.http.get(`${baseUrl}validaCompletarInformacion/${idEgresado}`);
  }

  getEstadoSolicitudCarnet(idEgresado: number): Observable<any> {
    return this.http.get(`${baseUrl}validarSolicitudes/${idEgresado}`);
  }

  enviarEstadoSolicitud(idSolicitud: number, estado: boolean) {
    return this.http.get(
      `${baseUrl}carnetizacionUpdateAdmin/${idSolicitud}/${estado}`
    );
  }

  enviarSolicitudCarnet(idSolicitud: number) {
    return this.http.get(`${baseUrl}enviarSolicitud/${idSolicitud}`);
  }

  cancelarSolicitudCarnet(idSolicitud: number) {
    return this.http.get(`${baseUrl}cancelarSolicitud/${idSolicitud}`);
  }

  public getEventos(): Observable<EventoInterface[]> {
    return this.http.get<EventoInterface[]>(`${baseUrl}eventos`);
  }

  public updateImage(eventId: string, files: Array<File>) {}
}
