import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfirmarEmailService {
  
  constructor(
    private http: HttpClient,
    private config: Config
  ) { }

  validar(codigo: string, password: string, passwordConfirmation: string): Observable<boolean>{
    let body = { password: password, password_confirmation: passwordConfirmation };
    return this.http.post<boolean>(this.config.baseUrl + "users/validar/" + codigo, body);
  }

  cuentaYaActiva(codigo: string): Observable<boolean> {
    return this.http.get<boolean>(this.config.baseUrl + "users/validar/" + codigo);
  }
}
