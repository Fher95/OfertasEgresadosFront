import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ServiciosService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getServicioApoyoBy(email: string) : Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}admin/servicios/${email}`);
  }
}
