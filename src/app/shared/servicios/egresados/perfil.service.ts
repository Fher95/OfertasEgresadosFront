import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) {

  }

  public perfilEgresado(correo: string): Observable<any> {
    const URLId = URL +'verPerfilEgresado/' + correo;
    return this.http.get<any>(URLId);
  }
  
}
