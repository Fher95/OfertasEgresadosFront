import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { OfertaLaboral, lstOfertas } from './OfertaLaboral';

@Injectable({
  providedIn: 'root'
})
export class ListarOfertasService {

  private urlSolicitud = 'http://localhost:8081/api/ofertas';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getOfertas(): Observable<OfertaLaboral[]> {
    const urlSol = 'http://localhost:8081/api/ofertas/empresas';
    return this.http.get<OfertaLaboral[]>(urlSol, this.httpOptions)
      .pipe(
        catchError(this.handleError<OfertaLaboral[]>('getOfertas', []))
      );
  }

  getOfertas2(): OfertaLaboral[] {
    return lstOfertas;
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
    // let json = JSON.stringify({ estado: 'Aceptada' });
    // let params = 'json=' + json;
    const objEstado = {estado: 'Rechazada'};
    const nuevaUrl = this.urlSolicitud.concat('/estado/').concat(parId.toString());
    return this.http.put(nuevaUrl, objEstado, this.httpOptions).pipe(

      catchError(this.handleError<any>('activarEmpresa'))
    );
  }
  desaprobarOferta(parId: number, parMotivo: string): Observable<any> {
    // let json = JSON.stringify({ estado: 'Rechazada', motivo: parMotivo });
    // let params = 'json=' + json;
    const objEstado = {estado: 'Rechazada', motivo: parMotivo };
    const nuevaUrl = this.urlSolicitud.concat('/estado/').concat(parId.toString());
    return this.http.put(nuevaUrl, objEstado, this.httpOptions).pipe(

      catchError(this.handleError<any>('activarEmpresa'))
    );
  }
}
