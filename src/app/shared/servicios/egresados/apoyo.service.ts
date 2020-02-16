import { ApoyoModel } from './../../modelos/apoyo.model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApoyoService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(pageIndex: number, pageSize: number): Observable<ApoyoResponse> {
    return this.http.get<ApoyoResponse>(
      `${this.baseUrl}apoyos?page_size=${pageSize}&page=${pageIndex + 1}`
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
}

export interface ApoyoResponse {
  data: ApoyoModel[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
  };
}
