import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud, solicitudGenerica } from './Solicitud';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ListarSolicitudesService } from './listar-solicitudes.service';
import { isNull } from 'util';

@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})

export class ListarSolicitudesEmpresaComponent implements OnInit {

  solicitudes: Solicitud[];
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
  solicitudSeleccionada = solicitudGenerica;
  arregloVacio = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private location: Location,
    private servicioLista: ListarSolicitudesService
  ) { }

  ngOnInit() {
    this.solicitudes = null;
    this.getSolicitudes();
    if (isNull(this.solicitudes)) {
      this.arregloVacio = true;
    } else {
      this.dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
    }
    console.log(this.arregloVacio);
  }

  getSolicitudes(): void {
    this.servicioLista.getSolicitudes()
      .subscribe(solicitudes => this.solicitudes = solicitudes);
  }

  getSolicitudes2(): void {
    this.solicitudes = this.servicioLista.getSolicitudes2();

  }

  getEstado(parEstado: boolean): string {
    if (parEstado === null) {
      return 'En Espera';
    } else if (parEstado) {
      return 'Activo';
    } else { return 'Inactivo'; }
  }

  setSolicitudActual(parId: number): void {    
    for (let index = 0; index < this.solicitudes.length; index++) {
      if (this.solicitudes[index].id === parId) {
        this.solicitudSeleccionada = this.solicitudes[index];
      }
    }
    console.log(this.solicitudSeleccionada);
  }

  getEstadoBoton(parSolicitud: Solicitud): string {
    let accion = 'Pendiente';
    if (!parSolicitud.estado) {
      accion = 'Activar';
    } else {
      accion = 'Desactivar';
    }
    return accion;
  }

  activarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null) {
      if (parSolicitud.estado === null) {
        this.servicioLista.activarSolicitud(parSolicitud.id);
      } else if (parSolicitud.estado) {
        this.servicioLista.desactivarSolicitud(parSolicitud.id);
      }
    }
  }

}
