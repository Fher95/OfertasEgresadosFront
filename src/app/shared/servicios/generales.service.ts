import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISector } from '../modelos/sectorInterface';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {
  
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    })
  };

  constructor(private httpClient: HttpClient) { }

  obtenerListaSectoresYSubSectores(): Observable<ISector[]>{
    return this.httpClient.get<ISector[]>("http://localhost:8081/api/sectores-subsectores", this.httpOptions);
  }
  obtenerListaPaises(): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/paises", this.httpOptions);
  }
  obtenerListaDepartamentos(id: string): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/departamentos/" + id, this.httpOptions);
  }
  obtenerListaCiudades(id: string): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/ciudades/" + id, this.httpOptions);
  }
  validarEmail(email: String): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/validarUsuario/" + email, this.httpOptions);
  }
  validarNIT(NIT: string): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/validarNIT/" + NIT, this.httpOptions);
  }
}
