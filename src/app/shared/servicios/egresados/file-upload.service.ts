import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const apiurl = "http://localhost:8081/api/";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let httpOptions = {
      headers : headers
    }
    return this.http.post(apiurl + 'egresados/verificar', formData, httpOptions);
  }
}
