import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ArrayHttpResponse } from '../../base/array-http-response';
import { DiscapacidadInterface } from '../../modelos/discapacidadInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscapacidadService {
  baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  obtenerDiscapacidades(): Observable<
    ArrayHttpResponse<DiscapacidadInterface>
  > {
    return this._http.get<ArrayHttpResponse<DiscapacidadInterface>>(
      `${this.baseUrl}discapacidades`
    );
  }

  obtenerDiscapacidadesByEgresado(
    idEgresado: number
  ): Observable<ArrayHttpResponse<DiscapacidadInterface>> {
    return this._http.get<ArrayHttpResponse<DiscapacidadInterface>>(
      `${this.baseUrl}discapacidades/${idEgresado}`
    );
  }
}
