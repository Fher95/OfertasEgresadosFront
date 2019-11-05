import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../../modelos/paisInterface';
import { DepartamentoInterface } from '../../modelos/departamentoInterface';
import { CiudadInterface } from '../../modelos/ciudadesInterface';
import { NivelAcademicoInterface } from '../../modelos/nivelAcademicoInterface';
import { FacultadInterface } from '../../modelos/facultadInterface';
import { ProgramaInterface } from '../../modelos/programaInteface';

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

  getNivelesAcademicos(): Observable<NivelAcademicoInterface> {
    return this.http.get<NivelAcademicoInterface>(`${baseUrl}nivelAcademico`);
  }

  getFacultad(): Observable<FacultadInterface[]>{
    return this.http.get<FacultadInterface[]>(`${baseUrl}facultades`);
  }

  getPrograma(facultadId: number): Observable<ProgramaInterface[]>{
    return this.http.get<ProgramaInterface[]>(`${baseUrl}programas/${facultadId}`);
  }
}
