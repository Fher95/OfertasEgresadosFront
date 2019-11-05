import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const url = "http://localhost:8081/users/validar/"

@Injectable({
  providedIn: 'root'
})
export class ConfirmarEmailService {

  constructor(private http: HttpClient) { }

  validar(codigo: string, password: string, passwordConfirmation: string) {
    return this.http.post(`${url}${codigo}`, {
      'password': password,
      'password_confirmation' : passwordConfirmation
    });
  }
}
