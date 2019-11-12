import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    "Accept": "multipart/form-data",
    "X-Requested-With": "XMLHttpRequest"
  });
  headerListar: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest"
  });

  constructor(private httpClient: HttpClient) { }

  registrarUsuario(objeto: FormData) {
    return this.httpClient.post("http://127.0.0.1:8081/api/empresas/store", objeto, { headers: this.headerArchivos });
  }
  subirArchivos(archivos: FormData, idEmpresa){
    console.log(archivos);
    return this.httpClient.post("http://127.0.0.1:8081/api/empresas/storeArchivos/" + idEmpresa, archivos, { headers: this.headerArchivos });
  }
  getDatos(id:String): Observable<any>{
    //obtener los datos de la peticion datos empresa
    return this.httpClient.get("http://127.0.0.1:8081/api/empresa/"+id, {headers: this.headers});
  }
  modificarEmpresa(id:String, objeto: Object){
    //realizar post al modificar empresas
    console.log("http://127.0.0.1:8081/api/empresa/"+id)
    console.log(objeto);
    return this.httpClient.put("http://127.0.0.1:8081/api/empresa/"+id, objeto, {headers: this.headers});
  }
  modificarFoto(file: File){
    const fd = new FormData();
    fd.append('image', file, file.name);
    //this.httpClient.post('', fd,{headers: this.headers});
  }
  modificarEstadoOferta(idEmpresa, idOferta, objOferta){
    return this.httpClient.put("http://127.0.0.1:8081/api/empresa/"+ idEmpresa + "/" + idOferta, objOferta, {headers: this.headers});
  }

  getHistorialOfertas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>("http://127.0.0.1:8081/api/ofertas/empresa/" + idEmpresa, {headers: this.headers});
  }
  getOfertasActivas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>("http://127.0.0.1:8081/api/ofertas/activas/empresa/" + idEmpresa, {headers: this.headers});
  }

  eliminarOferta(idEmpresa: string, idOferta: string){
    return this.httpClient.delete("http://127.0.0.1:8081/api/empresa/"+idEmpresa + "/"+ idOferta, {headers: this.headers});
  }
}
