import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EgresadoSaveInterface } from 'src/app/shared/modelos/egresadoSaveInterface';
import { User } from '../../modelos/user';
import { CompletarRegistro } from '../../modelos/completarRegistro';


const URL = 'http://localhost:8081/api/egresados';

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

  public completarRegistroEgresado(completar: CompletarRegistro, idEgresado: number) {
    console.log("Egresado: "+idEgresado);
    const URLCompletar = 'http://localhost:8081/api/completeEgresados/' + idEgresado;
    return this.http.put(URLCompletar, completar);
  }

  public idEgresado(correo: string): Observable<any> {
    const URLId = 'http://localhost:8081/api/getIdegresados/' + correo;
    return this.http.get<any>(URLId);
  }
  public validarCompletar(idEgresado: number){
    const URLValidar = 'http://localhost:8081/api/validaCompletarRegistro/'+idEgresado;
    return this.http.get<any>(URLValidar);
  } 
}