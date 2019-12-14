import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { EventoModel } from './../../modelos/evento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  save(evento: EventoModel, fileInput: File) {
    const formData = new FormData();
    formData.set('fileInput', fileInput);
    formData.set('nombre', evento.nombre);
    formData.set('lugar', evento.lugar);
    formData.set('descripcion', evento.descripcion);
    formData.set('fechaInicio', evento.fechaInicio.toDateString());
    formData.set('fechaFin', evento.fechaFin.toDateString());
    formData.set('cupos', evento.cupos.toString());
    formData.set('dirigidoA', evento.dirigidoA);
    return this.http.post(`${this.baseUrl}eventos`, formData);
  }

  update(evento: EventoModel) {
    return this.http
      .put(`${this.baseUrl}eventos`, {
        evento,
        fileInput: evento.imagePath
      })
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
