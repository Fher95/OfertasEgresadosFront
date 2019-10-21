import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {

  constructor(private httpClient: HttpClient) { }
  
  obtenerListaPaises(): Observable<any> {
    return this.httpClient.get("./assets/json/countries.json");
  }
  obtenerListaDepartamentos(): Observable<any> {
    return this.httpClient.get("./assets/json/states.json");
  }
  obtenerListaCiudades(): Observable<any> {
    return this.httpClient.get("./assets/json/cities.json");
  }

}
