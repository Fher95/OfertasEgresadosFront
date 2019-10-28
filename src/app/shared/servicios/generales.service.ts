import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubSector, ISector } from './../../shared/interfaces/subSector'

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
    return this.httpClient.get<ISector[]>("http://localhost:8081/Sectores-SubSectores", this.httpOptions);
  }
  obtenerListaPaises(): Observable<any> {
    return this.httpClient.get("http://localhost:8081/api/paises", this.httpOptions);
  }
  obtenerListaDepartamentos(id: string): Observable<any> {
    return this.httpClient.get("http://localhost:8081/api/departamentos/" + id, this.httpOptions);
  }
  obtenerListaCiudades(id: string): Observable<any> {
    return this.httpClient.get("http://localhost:8081/api/ciudades/" + id, this.httpOptions);
  }
  validarEmail(email: String): Observable<any> {
    return this.httpClient.get("http://localhost:8081/validarUsuario/" + email, this.httpOptions);
  }
  validarNIT(NIT: string) {
    return this.httpClient.get("http://localhost:8081/validarNIT/" + NIT, this.httpOptions);
  }
}
