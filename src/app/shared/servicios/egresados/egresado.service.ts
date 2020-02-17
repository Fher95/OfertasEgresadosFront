import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateInformacionPersonalModel } from '../../modelos/update-informacion-personal.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresadoService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  updateInformacionPersonal(informacionPersonal: UpdateInformacionPersonalModel): Observable<any>
  {
    return this.http.put(`${this.baseUrl}informacionPersonal`, informacionPersonal);
  }
}
