import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ServiciosService {
  constructor(private http: HttpClient) { }

  getServicioApoyoBy(email: string) : Observable<string[]> {
    // TODO: Poner la ruta del servicio para obtener los servicios del apoyo.
    return this.http.get<string[]>('');
  }
}
