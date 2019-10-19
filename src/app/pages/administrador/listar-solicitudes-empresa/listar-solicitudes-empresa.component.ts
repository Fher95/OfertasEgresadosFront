import { Component, OnInit, ViewChild } from '@angular/core';
import { lstSolicitudes } from './Solicitud';
import { Solicitud } from './Solicitud';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ListarSolicitudesService } from "./listar-solicitudes.service";

@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})
export class ListarSolicitudesEmpresaComponent implements OnInit {

  solicitudes = lstSolicitudes;
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  objSolicitudSeleccionada: Solicitud;
  constructor(
    private location: Location,
    private servicioLista: ListarSolicitudesService
  ) { }
  contador = 0;
  ngOnInit() {
    this.objSolicitudSeleccionada = this.solicitudes[0];
    }
  getNum(): number {
    this.contador = this.contador + 1;
    return this.contador;
  }
  setSolicitudActual(objSolicitud: Solicitud) {
    this.contador=0;
    this.objSolicitudSeleccionada = objSolicitud;
  }
  getSolicitudActual(): Solicitud {
    return this.objSolicitudSeleccionada;
  }
  getSolicitudes(): void {
    this.servicioLista.getSolicitudes()
    .subscribe(solicitudes => this.solicitudes = solicitudes);
  }
  updateSolicitud(parSolicitud: Solicitud): void {
    this.servicioLista.updateSolicitud(parSolicitud)
      .subscribe();
  }
  ActivarDesactivar(objSolicitud: Solicitud): void {
    this.contador=0;
    this.solicitudes.forEach(element => {
      if (element.id === objSolicitud.id) {
        if (element.estado === 'En espera') {
          element.estado = 'Activo';
          this.servicioLista.activarSolicitud(element.id).subscribe();
        } else if (element.estado === 'Activo') {
          element.estado = 'En espera';
        }
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  getEstadoBoton(): string {
    if (this.objSolicitudSeleccionada.estado === 'En espera') {
      return 'Activar';
    } else if (this.objSolicitudSeleccionada.estado === 'Activo') {
      return 'Desactivar';
    }
  }
}
