import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });

  constructor(private httpClient: HttpClient) { }

  registrarUsuario(objeto: Object) {
    return this.httpClient.post("http://127.0.0.1:8081/api/empresas/store", objeto, { headers: this.headers });
  }

}
