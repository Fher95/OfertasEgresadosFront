import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Solicitud } from "./pages/administrador/listar-solicitudes-empresa/Solicitud";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const solicitudes = [
      {nombre: 'primero', id: 1231, fecha: '2019-01-8', estado: 'En espera' },
      {nombre: 'segundo', id: 5672, fecha: '2019-02-9', estado: 'En espera'},
      {nombre: 'Tercero', id: 9103, fecha: '2019-03-10', estado: 'En espera'},
      {nombre: 'primero', id: 1234, fecha: '2019-04-11', estado: 'En espera'},
      {nombre: 'segundo', id: 5675, fecha: '2019-05-12', estado: 'En espera'},
      {nombre: 'Tercero', id: 9106, fecha: '2019-06-13', estado: 'En espera'},
      {nombre: 'primero', id: 1237, fecha: '2019-07-14', estado: 'En espera'},
      {nombre: 'segundo', id: 5678, fecha: '2019-08-15', estado: 'En espera'},
      {nombre: 'Tercero', id: 9109, fecha: '2019-09-16', estado: 'En espera'},
      {nombre: 'primero', id: 12310, fecha: '2019-10-17', estado: 'En espera'},
      {nombre: 'segundo', id: 567811, fecha: '2019-11-18', estado: 'En espera'}
    ];
    return {solicitudes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(solic: Solicitud[]): number {
    return solic.length > 0 ? Math.max(...solic.map(solic => solic.id)) + 1 : 11;
  }
}