import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaisModel } from '../../modelos/pais.model';
import { ArrayHttpResponse } from '../../base/array-http-response';
import { environment } from 'src/environments/environment';
import { DepartamentoModel } from '../../modelos/departamento.model';
import { CiudadModel } from '../../modelos/ciudad.model';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPaises(): Observable<ArrayHttpResponse<PaisModel>> {
    return this.http.get<ArrayHttpResponse<PaisModel>>(`${this.baseUrl}lugares/paises`);
  }

  getDepartamento(idPais: number): Observable<ArrayHttpResponse<DepartamentoModel>>{
    return this.http.get<ArrayHttpResponse<DepartamentoModel>>(`${this.baseUrl}lugares/departamentos/${idPais}`);
  }

  getCiudades(idDepartamento: number): Observable<ArrayHttpResponse<CiudadModel>> {
    return this.http.get<ArrayHttpResponse<CiudadModel>>(`${this.baseUrl}lugares/ciudades/${idDepartamento}`);
  }
}
