import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { ArrayHttpResponse } from './../../base/array-http-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GradoModel } from '../../modelos/grado.model';
import { SingleHttpResponse } from '../../base/single-http-response';

@Injectable({ providedIn: 'root' })
export class GradoService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  obtenerGradosEgresadoPor(
    id: number
  ): Observable<ArrayHttpResponse<GradoModel>> {
    return this.httpClient.get<ArrayHttpResponse<GradoModel>>(
      `${this.baseUrl}admin/egresados/grados/${id}`
    );
  }

  obtenerPorId(id: number): Observable<SingleHttpResponse<GradoModel>> {
    return this.httpClient.get<SingleHttpResponse<GradoModel>>(
      `${this.baseUrl}admin/grado/${id}`
    );
  }
}
