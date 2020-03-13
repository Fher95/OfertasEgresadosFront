import { Injectable, Component, Pipe, Directive } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISector } from '../modelos/sectorInterface';
import { ICargo } from '../modelos/cargoInterface';
import { CiudadInterface } from '../modelos/ciudadesInterface';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    })
  };

  constructor(private httpClient: HttpClient) { }

  obtenerListaSectoresYSubSectores(): Observable<ISector[]>{
    return this.httpClient.get<ISector[]>('http://localhost:8081/api/sectores-subsectores', this.httpOptions);
  }
  obtenerListaPaises(): Observable<any> {
    return this.httpClient.get('http://127.0.0.1:8081/api/paises', this.httpOptions);
  }
  obtenerListaDepartamentos(id: string): Observable<any> {
    return this.httpClient.get('http://127.0.0.1:8081/api/departamentos/' + id, this.httpOptions);
  }
  obtenerListaCiudades(id: string): Observable<CiudadInterface[]> {
    return this.httpClient.get<CiudadInterface[]>('http://127.0.0.1:8081/api/ciudades/' + id, this.httpOptions);
  }
  obtenerListaCargos(): Observable<ICargo[]>{
    return this.httpClient.get<ICargo[]>('http://127.0.0.1:8081/api/cargos', this.httpOptions);
  }
  obtenerListaSectores(): Observable<any[]>{
    return this.httpClient.get<any[]>('http://localhost:8081/api/sectores', this.httpOptions);
  }
  obtenerListaDepartamentosCiudades(id: string): Observable<any[]>
  {
    return this.httpClient.get<any[]>('http://localhost:8081/api/ciudadesPais/' + id, this.httpOptions);
  }

}
