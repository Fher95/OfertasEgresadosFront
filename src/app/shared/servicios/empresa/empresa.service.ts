import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHistorialOfertas } from  '../../modelos/historialOfertas';
import { IEgresado } from '../../modelos/egresadoInterface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlBase = environment.baseUrl;

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
    return this.httpClient.get(this.urlBase + "/validarUsuario/" + email, this.httpOptions);
  }
  validarNIT(NIT: string): Observable<any> {
    return this.httpClient.get(this.urlBase + "/validarNIT/" + NIT, this.httpOptions);
  }
  validarNombre(nombre: string): Observable<any> {
    return this.httpClient.get(this.urlBase + "/validarNombreEmpresa/" + nombre, this.httpOptions);
  }
  validarEmailCorp(email: string): Observable<any>{
    return this.httpClient.get(this.urlBase + "/validarEmailAdmin/" + email, this.httpOptions);
  }

  registrarUsuario(objeto: FormData) {
    return this.httpClient.post(this.urlBase + '/empresas/store', objeto, { headers: this.headerArchivos });
  }
  subirArchivos(archivos: FormData, idEmpresa){
    console.log(archivos);
    return this.httpClient.post(this.urlBase + '/empresas/storeArchivos/' + idEmpresa, archivos, { headers: this.headerArchivos });
  }
  guardarRegistroVisualizacionPostulado(parId: number, strFecha: string) {
    // let json =  JSON.stringify({ idPostulado : parId, fecha: strFecha });
    // let params = "json="+json;
    const objVisualizacion = { idPostulado : parId, fecha: strFecha };
    const varUrl = this.urlBase + '/ofertas/postulados/visto';
    return this.httpClient.put(varUrl, objVisualizacion, {headers: this.headers});
  }

  modificarEmpresa(id: String, objeto: Object){
    // realizar post al modificar empresas
    console.log(this.urlBase + '/empresa/' + id)
    console.log(objeto);
    return this.httpClient.put(this.urlBase + '/empresa/' + id, objeto, {headers: this.headers});
  }
  modificarFoto(file: File){
    const fd = new FormData();
    fd.append('image', file, file.name);
    // this.httpClient.post('', fd,{headers: this.headers});
  }
  modificarEstadoOferta(idOferta, objEstadoOferta){
    return this.httpClient.put(this.urlBase + "/ofertas/estado-proceso/" + idOferta, objEstadoOferta, {headers: this.headers});
  }

  getDatosOferta(id: string): Observable<any>{
    return this.httpClient.get(this.urlBase + '/ofertas/' + id, {headers: this.headers});
  }

  getDatos(id: String): Observable<any>{
    // obtener los datos de la peticion datos empresa
    return this.httpClient.get(this.urlBase + '/empresa/' + id, {headers: this.headers});
  }
  getHistorialOfertas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>(this.urlBase + '/ofertas/empresa/' + idEmpresa, {headers: this.headers});
  }
  getOfertasActivas(idEmpresa: string): Observable<IHistorialOfertas[]>{
    return this.httpClient.get<IHistorialOfertas[]>(this.urlBase + '/ofertas/activas/empresa/' + idEmpresa, {headers: this.headers});
  }
  getPostuladosOferta(idOferta: string): Observable<any> {
    return this.httpClient.get(this.urlBase + '/ofertas/postulados/' 
    + idOferta, {headers: this.headers});
  }
  getPostuladosSeleccionadosOferta(idOferta: string): Observable<any> {
    return this.httpClient.get(this.urlBase + '/ofertas/postulados/' + idOferta, {headers: this.headers});
  }
  eliminarOferta(idEmpresa: string, idOferta: string){
    return this.httpClient.delete(this.urlBase + '/empresa/' + idEmpresa + '/' + idOferta, {headers: this.headers});
  }
  obtenerAreasConocimiento(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlBase + "/areasConocimiento", this.httpOptions);
  }
  obtenerEstudiosMinimos(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlBase + "/nivelesEstudioU", this.httpOptions);
  }
  obtenerProgramas(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlBase + "/programas", this.httpOptions);
  }
  obtenerIdiomas(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlBase + "/idiomas", this.httpOptions);
  }
  obtenerDiscapacidades(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlBase + "/discapacidades", this.httpOptions);
  }
  obtenerID(email: string): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + "/getEmpresa/" + email, this.httpOptions);
  }
  getRangoSalariales(moneda:String):Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlBase + "/salarios/"+moneda,this.httpOptions);
  }
  getDatosContactoHv(idEmpresa: string): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + '/contactoHV/' + idEmpresa, {headers: this.headers});
  }
  crearOfertaLaboral(idEmpresa:String ,objeto: Object){
    return this.httpClient.post(this.urlBase + '/empresas/oferta/store/' + idEmpresa, objeto, {headers: this.headers});
  }
  modificarOfertaLaboral(idOferta: string,objeto: Object){
    return this.httpClient.post(this.urlBase + '/empresas/oferta/update/' + idOferta, objeto, {headers: this.headers});
  }
  guardarEstadoPostulado(parId: number, parIdOferta: string, parEstado: string): Observable<any> {
    
    const objEstado = {estado: parEstado};
    const nuevaUrl = this.urlBase.concat('/postulado/').concat(parId.toString())
    .concat('/').concat(parIdOferta)
    .concat('/estado');
    return this.httpClient.put(nuevaUrl, objEstado, this.httpOptions).pipe(
      
    );
  }
  validarEmpresaActiva(email: string): Observable<any>{
    return this.httpClient.get<any>(this.urlBase + "/verificar-empresa-activa/" + email, this.httpOptions);
  }

}
