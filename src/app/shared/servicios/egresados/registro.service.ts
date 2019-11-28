import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EgresadoSaveInterface } from 'src/app/shared/modelos/egresadoSaveInterface';
import { User } from '../../modelos/user';
import { CompletarRegistro } from '../../modelos/completarRegistro';


const URL = 'http://localhost:8081/api/egresados';
const URLCompletar = 'http://localhost:8081/api/completeEgresados/1'

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) {

  }

  public storeEgresado(egresado: User) {
    console.log("Sending POST request");
    return this.http.post(URL, egresado);
  }

  public completarRegistroEgresado(completar: CompletarRegistro) {
    return this.http.post(URLCompletar, completar);
  }

}
