import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { datosEmpresaService } from '../../modelos/datosEmpresaService';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  
  constructor(private httpClient: HttpClient) { }

  registrarUsuario(objeto: Object){
    return this.httpClient.post("http://127.0.0.1:8081/api/empresas/store", objeto, {headers: this.headers});
  }
  getDatos(): Observable<any>{
    //obtener los datos de la peticion datos empresa
    return this.httpClient.get<datosEmpresaService>("http://127.0.0.1:8081/api/empresa/1", {headers: this.headers});
  }
  modificarEmpresa(objeto: Object){
    //realizar post al modificar empresas
    return this.httpClient.post("http://127.0.0.1:8081/api/empresa/1", objeto, {headers: this.headers});
  }
}
