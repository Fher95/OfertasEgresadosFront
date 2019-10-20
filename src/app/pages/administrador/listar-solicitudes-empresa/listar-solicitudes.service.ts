import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { lstSolicitudes } from './Solicitud';
import { Solicitud } from './Solicitud';


@Injectable({ providedIn: 'root' })
export class ListarSolicitudesService {
    private urlSolicitud = 'http://localhost:8081/api/empresa';  // URL to web api
    httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": localStorage.getItem("accessToken")
        })
    };
    constructor(
        private http: HttpClient
    ) { }
    getSolicitudes(): Observable<Solicitud[]> {
        return this.http.get<Solicitud[]>(this.urlSolicitud, this.httpOptions)
            .pipe(
                catchError(this.handleError<Solicitud[]>('getSolicitudes', []))
            );
    }
    getSolicitud(id: number): Observable<Solicitud> {
        const url = `${this.urlSolicitud}/${id}`;
        return this.http.get<Solicitud>(url).pipe(
            catchError(this.handleError<Solicitud>(`getSolicitud id=${id}`))
        );
    }
    /** PUT: update the solicitud on the server */
    updateSolicitud(objSolicitud: Solicitud): Observable<any> {
        return this.http.put(this.urlSolicitud, objSolicitud, this.httpOptions).pipe(
            catchError(this.handleError<any>('actualizarSolicitudes'))
        );
    }
    activarSolicitud(parId: number): Observable<any>{
        return this.http.put(this.urlSolicitud, parId, this.httpOptions).pipe(
            catchError(this.handleError<any>('activarSolicitud'))
        );
    }
    desactivarSolicitud(parId: number): Observable<any>{
        return this.http.put(this.urlSolicitud, parId, this.httpOptions).pipe(
            catchError(this.handleError<any>('desactivarSolicitud'))
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
}
