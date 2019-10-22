import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient: HttpClient) { }

  registrarUsuario(objeto: Object){
    return this.httpClient.post("http://127.0.0.1:8081/api/empresas/store",objeto);
  }
}
