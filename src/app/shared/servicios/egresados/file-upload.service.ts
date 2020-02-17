import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaVerificarExcel } from '../../modelos/respuestaVerificarEgresados';
import { Observable } from 'rxjs';
import { EgresadoVerificar } from '../../modelos/egresadosVerificarInterface';
const apiurl = "http://localhost:8081/api/";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) : Observable<EgresadoVerificar[]>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let httpOptions = {
      headers : headers
    }
    return this.http.post<EgresadoVerificar[]>(apiurl + 'egresados/verificar', formData, httpOptions);
  }
}
