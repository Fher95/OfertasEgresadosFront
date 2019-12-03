import { ApoyoModel } from './../../modelos/apoyo.model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApoyoService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ApoyoModel[]> {
    return this.http.get<ApoyoModel[]>(`${this.baseUrl}apoyos`);
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
