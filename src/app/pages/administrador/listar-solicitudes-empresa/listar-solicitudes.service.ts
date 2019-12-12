import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Solicitud } from './Solicitud';
import { lstSolicitudes } from './Solicitud';

@Injectable({ providedIn: 'root' })
export class ListarSolicitudesService {
    solicitudes = lstSolicitudes;
    private urlSolicitud = 'http://localhost:8081/api/empresa';  // URL to web api
    httpOptions = {
        headers: new HttpHeaders({
            // "Content-Type": "application/x-www-form-urlencoded",
            "Content-Type": "application/json",
            // "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjAsImVtYWlsIjoianVhbkBhZG1pbi5jb20iLCJpZF9yb2wiOjAsImZpcnN0X25hbWUiOiJKdWFuIiwibGFzdF9uYW1lIjoiVmVsZXoiLCJpYXQiOjE1NzE1MzI2MjcsImV4cCI6MTU3MjEzNzQyN30.ggfsEewjLgzg9PNKf8a4onkpYVTbBS2FFeYbFDh2QXE"
        })
    };
    private cambioRealizado: boolean = false;

    constructor(
        private http: HttpClient
    ) { }

    getSolicitudes(): Observable<Solicitud[]> {
        const urlSol = 'http://localhost:8081/api/empresa/enEspera';
        return this.http.get<Solicitud[]>(urlSol, this.httpOptions)
            .pipe(
                catchError(this.handleError<Solicitud[]>('getSolicitudes', []))
            );
    }
    getSolicitudes2(): Solicitud[] {
        console.log(this.solicitudes);
        return this.solicitudes;
    }
    /** PUT: update the solicitud on the server */
    activarSolicitud(parId: number, parNumPublicaciones: number): Observable<any> {
        let params = '{ "estado" : "Activo", "limite_publicaciones": ' + parNumPublicaciones + '}';
        // let params = "json="+json;
        const nuevaUrl = this.urlSolicitud.concat('/estado/').concat(parId.toString());
        return this.http.put(nuevaUrl, params, this.httpOptions).pipe(

            catchError(this.handleError<any>('activarEmpresa'))
        );
    }

    desactivarSolicitud(parId: number): Observable<any> {

        let json = JSON.stringify({ estado: 'Inactivo' });
        let params = "json=" + json;
        console.log(params);
        const nuevaUrl = this.urlSolicitud.concat('/estado/').concat(parId.toString());
        return this.http.put(nuevaUrl, params, this.httpOptions).pipe(

            catchError(this.handleError<any>('activarEmpresa'))
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
    notificarCambio() {
        this.cambioRealizado = true;
    }

    cambioRegistrado(): boolean {
        return this.cambioRealizado;
    }

    cambioActualizado() {
        this.cambioRealizado = false;
    }
}
