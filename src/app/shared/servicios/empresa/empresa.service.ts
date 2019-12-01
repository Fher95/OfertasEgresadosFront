import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHistorialOfertas } from  '../../modelos/historialOfertas';
import { IEgresado } from '../../modelos/egresadoInterface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });
  headerArchivos: HttpHeaders = new HttpHeaders({
    'Accept': 'multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest'
  });
  headerListar: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  });

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    })
  };

  constructor(private httpClient: HttpClient) { }

  validarEmail(email: String): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/validarUsuario/" + email, this.httpOptions);
  }
  validarNIT(NIT: string): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/validarNIT/" + NIT, this.httpOptions);
  }
  validarNombre(nombre: string): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8081/api/validarNombreEmpresa/" + nombre, this.httpOptions);
  }
  validarEmailCorp(email: string): Observable<any>{
    return this.httpClient.get("http://127.0.0.1:8081/api/validarEmailAdmin/" + email, this.httpOptions);
  }

  registrarUsuario(objeto: FormData) {
    return this.httpClient.post('http://127.0.0.1:8081/api/empresas/store', objeto, { headers: this.headerArchivos });
  }
  subirArchivos(archivos: FormData, idEmpresa){
    console.log(archivos);
    return this.httpClient.post('http://127.0.0.1:8081/api/empresas/storeArchivos/' + idEmpresa, archivos, { headers: this.headerArchivos });
  }
  guardarRegistroVisualizacionPostulado(parId: number, strFecha: string) {
    // let json =  JSON.stringify({ idPostulado : parId, fecha: strFecha });
    // let params = "json="+json;
    const objVisualizacion = { idPostulado : parId, fecha: strFecha };
    const varUrl = 'http://127.0.0.1:8081/api/ofertas/postulados/visto';
    return this.httpClient.put(varUrl, objVisualizacion, {headers: this.headers});
  }

  modificarEmpresa(id: String, objeto: Object){
    // realizar post al modificar empresas
    console.log('http://127.0.0.1:8081/api/empresa/' + id)
    console.log(objeto);
    return this.httpClient.put('http://127.0.0.1:8081/api/empresa/' + id, objeto, {headers: this.headers});
  }
  modificarFoto(file: File){
    const fd = new FormData();
    fd.append('image', file, file.name);
    // this.httpClient.post('', fd,{headers: this.headers});
  }
  modificarEstadoOferta(idOferta, objEstadoOferta){
    console.log("objeto a mandar: ", objEstadoOferta);
      return this.httpClient.put("http://127.0.0.1:8081/api/ofertas/estado-proceso/" + idOferta, objEstadoOferta, {headers: this.headers});
  }
  getDatos(id: String): Observable<any>{
    // obtener los datos de la peticion datos empresa
    return this.httpClient.get('http://127.0.0.1:8081/api/empresa/' + id, {headers: this.headers});
  }
  getHistorialOfertas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>('http://127.0.0.1:8081/api/ofertas/empresa/' + idEmpresa, {headers: this.headers});
  }
  getOfertasActivas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>('http://127.0.0.1:8081/api/ofertas/activas/empresa/' + idEmpresa, {headers: this.headers});
  }
  getPostuladosOferta(idOferta: string): Observable<IEgresado[]> {
    return this.httpClient.get<IEgresado[]>('http://127.0.0.1:8081/api/ofertas/postulados/' + idOferta, {headers: this.headers});
  }
  getPostuladosSeleccionadosOferta(idOferta: string): Observable<IEgresado[]> {
    return this.httpClient.get<IEgresado[]>('http://127.0.0.1:8081/api/ofertas/postuladosSelect/' + idOferta, {headers: this.headers});
  }
  eliminarOferta(idEmpresa: string, idOferta: string){
    return this.httpClient.delete('http://127.0.0.1:8081/api/empresa/' + idEmpresa + '/' + idOferta, {headers: this.headers});
  }
  obtenerAreasConocimiento(): Observable<any[]>{
    return this.httpClient.get<any[]>("http://127.0.0.1:8081/api/areasConocimiento", this.httpOptions);
  }
  obtenerProgramas(): Observable<any[]>{
    return this.httpClient.get<any[]>("http://127.0.0.1:8081/api/programas", this.httpOptions);
  }
  obtenerIdiomas(): Observable<any[]>{
    return this.httpClient.get<any[]>("http://localhost:8081/api/idiomas", this.httpOptions);
  }
  obtenerDiscapacidades(): Observable<any[]>{
    return this.httpClient.get<any[]>("http://localhost:8081/api/discapacidades", this.httpOptions);
  }
  crearOfertaLaboral(idEmpresa:String ,objeto: Object){
    //return this.httpClient.put('http://127.0.0.1:8081/api/ofertas/store' + idEmpresa, objeto, {headers: this.headers});
      return this.httpClient.post('http://127.0.0.1:8081/api/ofertas/store', objeto, {headers: this.headers});

  }
}
