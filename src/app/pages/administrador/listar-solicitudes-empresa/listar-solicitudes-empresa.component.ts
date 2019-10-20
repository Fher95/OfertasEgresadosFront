import { Component, OnInit, ViewChild } from '@angular/core';
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

  solicitudes: Solicitud[];
  displayedColumns: string[] = ['nombre', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
  solicitudSeleccionada: Solicitud;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private location: Location,
    private servicioLista: ListarSolicitudesService
  ) { }


  ngOnInit() {
    this.getSolicitudes();
  }

  getSolicitudes(): void {
    this.servicioLista.getSolicitudes()
      .subscribe(solicitudes => this.solicitudes = solicitudes);
  }
  getEstado(parEstado: boolean): string {
    if (parEstado) {
      return "Activo";
    } else if (parEstado===null){
      return "En Espera";
    } else { return "Inactivo"; }

  }
  setSolicitudActual(parId: number): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.solicitudes.length; index++) {

      if( this.solicitudes[index].id === parId) {
        this.solicitudSeleccionada = this.solicitudes[index];
      }

    }    
  }
  getEstadoBoton(parSolicitud: Solicitud): string {
    let accion = "Pendiente";
    if(!parSolicitud.estado){
      accion = "Activar";
    } else {
      accion = "Desactivar";
    }
    return accion;
  }
  activarEmpresa(): void{
    this.servicioLista.activarEmpresa(this.solicitudSeleccionada.id);
  }
}
