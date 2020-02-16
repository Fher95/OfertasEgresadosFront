import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { EventoModel } from './../../modelos/evento.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventoInterface } from '../../../shared/modelos/evento';
import { ArrayEventoHttpResponse } from './../../base/array-eventos-http-response';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private baseUrl: string = `${environment.baseUrl}admin/`;
  constructor(private http: HttpClient) { }

  save(evento: EventoModel, fileInput: File) {
    const formData = new FormData();
    formData.set('fileInput', fileInput);
    formData.set('nombre', evento.nombre);
    formData.set('lugar', evento.lugar);
    formData.set('descripcion', evento.descripcion);
    formData.set('fechaInicio', evento.fechaInicio);
    formData.set('fechaFin', evento.fechaFin);
    formData.set('cupos', evento.cupos.toString());
    formData.set('dirigidoA', evento.dirigidoA);
    return this.http.post(`${this.baseUrl}eventos`, formData);
  }

  update(evento: EventoModel, fileInput: File): Observable<EventoModel> {
    const formData = new FormData();
    formData.append('fileInput', fileInput);
    return this.http
      .put<EventoModel>(`${this.baseUrl}eventos`, {
        evento,
        'file': formData
      }
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getA() {
    return this.http.get(`${this.baseUrl}eventos`);
  }

  getAll(
    pageIndex: number,
    pageSize: number,
    filter: { lugar: string; fecha: string } = null
  ): Observable<EventoResponse> {
    console.log(filter);
    let httpParams = new HttpParams();
    httpParams = httpParams.append('page', (pageIndex + 1).toString());
    httpParams = httpParams.append('pageSize', pageSize.toString());
    if (filter != null) {
      if (filter.lugar.length > 0) {
        httpParams = httpParams.append('lugar', filter.lugar.trim());
      }
      if (filter.fecha.length > 0) {
        httpParams = httpParams.append('fecha', filter.fecha);
      }
    }
    return this.http.get<EventoResponse>(`${this.baseUrl}eventos`, {
      params: httpParams
    });
  }

  public getEventos(): Observable<ArrayEventoHttpResponse<EventoInterface[]>> {
    return this.http.get<ArrayEventoHttpResponse<EventoInterface[]>>(`${this.baseUrl}eventos`);
  }
}

export interface EventoResponse {
  data: EventoModel[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
  };
}
