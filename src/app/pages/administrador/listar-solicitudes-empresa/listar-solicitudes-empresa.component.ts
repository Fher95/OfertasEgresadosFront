import { Component, OnInit, ViewChild } from '@angular/core';
import { lstSolicitudes } from './Solicitud';
import { Solicitud } from './Solicitud';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ListarSolicitudesService } from './listar-solicitudes.service';

@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})
export class ListarSolicitudesEmpresaComponent implements OnInit {

  solicitudes = [];
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
  frase = 'Aqui va la frase';
  idSolicitudActual = -1;
  varSolicitudActual: Solicitud;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private location: Location,
    private servicioLista: ListarSolicitudesService
  ) { }

  contador = 0;

  ngOnInit() {
    this.getSolicitudes();
  }

  getNum(): number {
    this.contador = this.contador + 1;
    return this.contador;
  }
  getSolicitudes(): void {
    this.servicioLista.getSolicitudes()
      .subscribe(solicitudes => this.solicitudes = solicitudes);
    if (this.solicitudes.length === 0) {
      this.frase = 'No se pudieron alcanzar los elementos de la lista'
    } else { this.frase = ''; }
  }
  getSolicitud(parId: number): Solicitud {
    this.varSolicitudActual.id = -1;
    this.varSolicitudActual.nombre = '';
    this.varSolicitudActual.fecha = '';
    this.varSolicitudActual.estado = '';
    this.servicioLista.getSolicitud(parId).
      subscribe(solicitud => this.varSolicitudActual = solicitud);
    return this.varSolicitudActual;
  }
  updateSolicitud(parSolicitud: Solicitud): void {
    this.servicioLista.updateSolicitud(parSolicitud)
      .subscribe();
  }
  ActivarDesactivar(idSolicitud: number): void {
    this.contador = 0;
    this.getSolicitud(idSolicitud);

    if (this.varSolicitudActual.estado === 'Activo') {
      this.servicioLista.desactivarSolicitud(idSolicitud).subscribe();
    } else if (this.varSolicitudActual.estado === 'En espera') {
      this.servicioLista.activarSolicitud(idSolicitud).subscribe();
    }

  }
  goBack(): void {
    this.location.back();
  }
  getEstadoBoton(): string {
    if (this.varSolicitudActual.estado === 'Activo') {
      return 'Desactivar';
    } else {
      return 'Activar';
    }
  }
  setSolicitudActual(parSolicitud: Solicitud) {
    this.idSolicitudActual = parSolicitud.id;
    this.getSolicitud(parSolicitud.id);
  }
}
