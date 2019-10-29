import { Component, OnInit, ViewChild } from '@angular/core';
import { OfertaLaboral } from './OfertaLaboral';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { isNull } from 'util';


@Component({
  selector: 'app-listar-ofertas',
  templateUrl: './listar-ofertas.component.html',
  styleUrls: ['./listar-ofertas.component.css']
})
export class ListarOfertasComponent implements OnInit {

  ofertas: OfertaLaboral[];
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<OfertaLaboral>(this.ofertas);
  arregloVacio = false;
  ofertaSeleccionada: OfertaLaboral;

  constructor() { }

  ngOnInit() {
  }

  getEstado(parEstado: boolean): string {
    if (parEstado === null) {
      return 'En Espera';
    } else if (parEstado) {
      return 'Activo';
    } else { return 'Inactivo'; }
  }

  setOfertaActual(parId: number): void {
    for (let index = 0; index < this.ofertas.length; index++) {
      if (this.ofertas[index].id_aut_oferta === parId) {
        this.ofertaSeleccionada = this.ofertas[index];
      }
    }
    console.log(this.ofertaSeleccionada);
  }

}
