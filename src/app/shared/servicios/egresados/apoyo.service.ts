import { ApoyoModel } from './../../modelos/apoyo.model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApoyoFilter } from '../../modelos/filters/apoyo.filter';
import { buildParamsFiltersWithPages } from '../../common/build-param-filters';

@Injectable({
  providedIn: 'root'
})
export class ApoyoService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number, filter: ApoyoFilter): Observable<ApoyoResponse> {
    let httpParams = buildParamsFiltersWithPages(filter, pageSize, pageIndex);
    return this.http.get<ApoyoResponse>(
      `${this.baseUrl}apoyos`, {
        params: httpParams
      }
    );
  }

  getById(idApoyo: number): Observable<ApoyoModel> {
    return this.http.get<ApoyoModel>(`${this.baseUrl}apoyos/${idApoyo}`);
  }

  save(apoyo: ApoyoModel): Observable<ApoyoModel> {
    return this.http.post<ApoyoModel>(`${this.baseUrl}apoyos`, apoyo);
  }

  update(apoyo: ApoyoModel): Observable<ApoyoModel> {
    return this.http.put<ApoyoModel>(`${this.baseUrl}apoyos`, apoyo);
  }

  activarEmail(codigo: string) : Observable<any>{
    return this.http.put(`${this.baseUrl}apoyos/activaremail/${codigo}`, {});
  }
}

export interface ApoyoResponse {
  data: ApoyoModel[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
  };
}
