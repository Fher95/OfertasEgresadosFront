import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Solicitud } from './Solicitud';


@Injectable({ providedIn: 'root' })
export class ListarSolicitudesService {
    private urlSolicitud = 'api/solicitudes';  // URL to web api
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient
    ) { }

    getSolicitudes(): Observable<Solicitud[]> {
        return this.http.get<Solicitud[]>(this.urlSolicitud)
            .pipe(
                catchError(this.handleError<Solicitud[]>('getSolicitudes', []))
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