import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { datosEmpresaService } from '../../modelos/datosEmpresaService';
import { IHistorialOfertas } from  '../../modelos/historialOfertas';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });
  headerArchivos: HttpHeaders = new HttpHeaders({
    "Content-Type": "multipart/form-data",
    "Accept": "application/json"
  });
  headerListar: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest"
  });
  constructor(private httpClient: HttpClient) { }

  registrarUsuario(objeto: Object) {
    console.log(JSON.stringify(objeto));
    return this.httpClient.post("http://127.0.0.1:8081/api/empresas/store", objeto, { headers: this.headerArchivos });
  }
  getDatos(id:String): Observable<any>{
    //obtener los datos de la peticion datos empresa
    return this.httpClient.get("http://127.0.0.1:8081/api/empresa/"+id, {headers: this.headers});
  }
  modificarEmpresa(id:String, objeto: Object){
    //realizar post al modificar empresas
    console.log("http://127.0.0.1:8081/api/empresa/"+id)
    return this.httpClient.put("http://127.0.0.1:8081/api/empresa/"+id, objeto, {headers: this.headers});
  }

  modificarFoto(file: File){
    const fd = new FormData();
    fd.append('image', file, file.name);
    //this.httpClient.post('', fd,{headers: this.headers});
  }

  getHistorialOfertas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>("http://127.0.0.1:8081/api/ofertas/empresa/" + idEmpresa, {headers: this.headers});
  }
  getOfertasActivas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>("http://127.0.0.1:8081/api/ofertas/activas/empresa/" + idEmpresa, {headers: this.headers});
  }
}
