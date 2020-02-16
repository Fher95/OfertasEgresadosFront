import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) {

  }

  public perfilEgresado(correo: string): Observable<any> {
    const URLId = 'http://localhost:8081/api/verPerfilEgresado/' + correo;
    return this.http.get<any>(URLId);
  }
  
}
