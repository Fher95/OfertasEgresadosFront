import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EgresadoSaveInterface } from 'src/app/shared/modelos/egresadoSaveInterface';
import { User } from '../../modelos/user';
import { CompletarRegistro } from '../../modelos/completarRegistro';
import { environment } from 'src/environments/environment';


const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) {

  }

  public storeEgresado(egresado: User) {
    console.log("Sending POST request");
    return this.http.post(URL+'egresados', egresado);
  }

  public completarRegistroEgresado(completar: CompletarRegistro, idEgresado: number) {
    console.log("Egresado: "+idEgresado);
    const URLCompletar = URL +'completeEgresados/' + idEgresado;
    return this.http.put(URLCompletar, completar);
  }

  public idEgresado(correo: string): Observable<any> {
    const URLId = URL + 'getIdegresados/' + correo;
    return this.http.get<any>(URLId);
  }
  public validarCompletar(idEgresado: number){
    const URLValidar = URL + 'validaCompletarRegistro/'+idEgresado;
    return this.http.get<any>(URLValidar);
  } 
  public cuestionarioComentario(){
    const URLComentario = URL + 'cuestionario';
    return this.http.get<any>(URLComentario);
  }
}