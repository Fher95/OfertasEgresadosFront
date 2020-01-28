import { ArrayHttpResponse } from './../../base/array-http-response';
import { SingleHttpResponse } from './../../base/single-http-response';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { EgresadoModel } from './../../modelos/egresado.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EgresadoService implements OnInit {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {}

  getAll(
    page: number,
    pageSize: number,
    filter: EgresadoFilter
  ): Observable<ArrayHttpResponse<EgresadoModel>> {
    let httpParams = this.buildFilterParams(filter);
    httpParams = httpParams.append('page', (page + 1).toString());
    httpParams = httpParams.append('pageSize', pageSize.toString());
    console.log(httpParams);
    return this.http.get<ArrayHttpResponse<EgresadoModel>>(
      `${this.baseUrl}admin/egresados`,
      {
        params: httpParams
      }
    );
  }

  getById(id: number): Observable<SingleHttpResponse<EgresadoModel>> {
    return this.http.get<SingleHttpResponse<EgresadoModel>>(
      `${this.baseUrl}admin/egresados/${id}`
    );
  }

  private buildFilterParams(filter: EgresadoFilter) {
    console.log('Build filters');
    let httpParams = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(key => {
        if (key[1] !== undefined && key[1] !== "") {

          httpParams = httpParams.append(key[0], key[1]);
        }
      });
    }
    return httpParams;
  }
}

export class EgresadoFilter {
  constructor(
    public cedula?: string,
    public nombre?: string,
    public programa?: string,
    public titulo?: string,
    public estado?: string
  ) {}
}
