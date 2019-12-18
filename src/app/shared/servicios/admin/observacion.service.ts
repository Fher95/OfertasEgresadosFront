import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { ArrayHttpResponse } from './../../base/array-http-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObservacionModel } from '../../modelos/observacion.model';

@Injectable({ providedIn: 'root' })
export class ObservacionService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ArrayHttpResponse<ObservacionModel>> {
    return this.httpClient.get<ArrayHttpResponse<ObservacionModel>>(
      `${this.baseUrl}admin/observaciones`
    );
  }
}
