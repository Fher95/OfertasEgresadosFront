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

const baseUrl = 'http://localhost:8081/api/';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${baseUrl}paises`);
  }

  getDepartamentosBy(paisId: number): Observable<DepartamentoInterface[]> {
    return this.http.get<DepartamentoInterface[]>(`${baseUrl}departamentos/${paisId}`);
  }

  getCiudadesBy(departamentoId: number): Observable<CiudadInterface[]> {
    return this.http.get<CiudadInterface[]>(`${baseUrl}ciudades/${departamentoId}`);
  }

  getNivelEducativo(): Observable<NivelesEstudioInterface[]>{
    return this.http.get<ProgramaInterface[]>(`${baseUrl}nivelesPrograma`);
  }

  getSede(): Observable<SedeInterface[]>{
    return this.http.get<SedeInterface[]>(`${baseUrl}sedes`);
  }

  getFacultad(idSede: number): Observable<FacultadInterface[]>{
    return this.http.get<FacultadInterface[]>(`${baseUrl}facultades/${idSede}`);
  }

  getPrograma(idFacultad: number,idSede: number, idNivelEstudio: number): Observable<ProgramaInterface[]>{
    return this.http.get<ProgramaInterface[]>(`${baseUrl}programas/${idSede}/${idFacultad}/${idNivelEstudio}`);
  }



  getDiscapacidad(): Observable<DiscapacidadInterface[]>{
    return this.http.get<DiscapacidadInterface[]>(`${baseUrl}discapacidades`);
  }

}
