import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { OfertaLaboral } from "./OfertaLaboral";

@Injectable({
  providedIn: 'root'
})
export class ListarOfertasService {

  private urlSolicitud = 'http://localhost:8081/api/empresa';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type": "application/json",
      // "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjAsImVtYWlsIjoianVhbkBhZG1pbi5jb20iLCJpZF9yb2wiOjAsImZpcnN0X25hbWUiOiJKdWFuIiwibGFzdF9uYW1lIjoiVmVsZXoiLCJpYXQiOjE1NzE1MzI2MjcsImV4cCI6MTU3MjEzNzQyN30.ggfsEewjLgzg9PNKf8a4onkpYVTbBS2FFeYbFDh2QXE"
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getOfertas(): Observable<OfertaLaboral[]> {
    const urlSol = 'http://localhost:8081/api/ofertas/empresa';
    return this.http.get<OfertaLaboral[]>(urlSol, this.httpOptions)
      .pipe(
        catchError(this.handleError<OfertaLaboral[]>('getSolicitudes', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  aprobarOferta(parId: number): Observable<any> {
    let json = JSON.stringify({ estado: 'Aprobada' });
    let params = "json=" + json;
    const nuevaUrl = this.urlSolicitud.concat('/estado/').concat(parId.toString());
    return this.http.put(nuevaUrl, params, this.httpOptions).pipe(

      catchError(this.handleError<any>('activarEmpresa'))
    );
  }
  desaprobarOferta(parId: number): Observable<any> {
    let json = JSON.stringify({ estado: 'Desaprobada' });
    let params = "json=" + json;
    const nuevaUrl = this.urlSolicitud.concat('/estado/').concat(parId.toString());
    return this.http.put(nuevaUrl, params, this.httpOptions).pipe(

      catchError(this.handleError<any>('activarEmpresa'))
    );
  }
}
