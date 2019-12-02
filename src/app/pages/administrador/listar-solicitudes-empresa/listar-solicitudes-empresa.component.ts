import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud, solicitudGenerica } from './Solicitud';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { ListarSolicitudesService } from './listar-solicitudes.service';
import { isNull } from 'util';

@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})

export class ListarSolicitudesEmpresaComponent implements OnInit {

  solicitudes: Solicitud[];
  displayedColumns: string[] = ['estado', 'nombre', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
  seleccionNumOfertas: number = 0 ;
  seleccionValida = false;

  solicitudSeleccionada = solicitudGenerica;
  arregloVacio = false;
  auxiliar = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private location: Location,
    private servicioLista: ListarSolicitudesService
  ) { }

  ngOnInit() {
    this.solicitudes = null;
    this.getSolicitudes2();
  }

  getSolicitudes(): void {
    this.servicioLista.getSolicitudes()
      .subscribe(solicitudes => {
        this.solicitudes = solicitudes;
        this.auxiliar = true;

        this.dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
        this.dataSource.paginator = this.paginator;

        if (this.solicitudes.length == 0 || isNull(this.solicitudes)) {
          this.arregloVacio = true;
        }
      });
  }
  
// Este método solo se usa para realizar pruebas sin valerse del back-end
  getSolicitudes2(): void {
    this.solicitudes = this.servicioLista.getSolicitudes2();
    this.auxiliar = true;
    this.dataSource = new MatTableDataSource<Solicitud>(this.solicitudes);
    this.dataSource.paginator = this.paginator;
    if (this.solicitudes.length == 0 || isNull(this.solicitudes)) {
      this.arregloVacio = true;
    }
    this.dataSource.paginator = this.paginator;
  }

  getEstado(parEstado: string): string {
    /*if (parEstado === null) {
      return 'En Espera';
    } else if (parEstado) {
      return 'Activo';
    } else { return 'Inactivo'; }*/
    return parEstado;
  }

  setSolicitudActual(parId: number): void {
    console.log('parID: '+parId);
    for (let index = 0; index < this.solicitudes.length; index++) {
      if (this.solicitudes[index].id_aut_empresa === parId) {
        this.solicitudSeleccionada = this.solicitudes[index];
      }
    }
    console.log(this.solicitudSeleccionada);
  }

  /*getEstadoBoton(parSolicitud: Solicitud): string {
    let accion = 'Pendiente';
    console.log(parSolicitud.estado);
    if (!parSolicitud.estado) {
      accion = 'Activar';
    } else {
      accion = 'Desactivar';
    }
    return accion;
  }*/

  /*activarDesactivarEmpresa(parSolicitud: Solicitud): void {
    console.log("Enviando peticion!!!!!");
    if (parSolicitud != null) {
      if (parSolicitud.estado === null) {
        this.servicioLista.activarSolicitud(parSolicitud.id);
      } else if (parSolicitud.estado) {
        this.servicioLista.desactivarSolicitud(parSolicitud.id);
      }
    }
  }*/

  activarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null){
      this.servicioLista.activarSolicitud(parSolicitud.id_aut_empresa, this.seleccionNumOfertas)
        .subscribe(result => {
          console.log(result);
          this.getSolicitudes();
          this.reiniciarSeleccion();
        });
    }
  }

  desactivarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null){
      this.servicioLista.desactivarSolicitud(parSolicitud.id_aut_empresa)
        .subscribe(result => {
          console.log(result);
          this.getSolicitudes();
          this.reiniciarSeleccion();
        });
    }
  }

  activacionValida(): void {
    if (this.seleccionNumOfertas > 0){
      this.seleccionValida = true;
    } else {
      this.seleccionValida = false;
    }
  }

  reiniciarSeleccion(): void {
    this.seleccionNumOfertas = 0;
    this.seleccionValida = false;
  }
}
