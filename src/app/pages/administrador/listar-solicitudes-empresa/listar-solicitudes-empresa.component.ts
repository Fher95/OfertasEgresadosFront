import { Component, OnInit } from '@angular/core';
import { lstSolicitudes } from './Solicitud';
import { Solicitud } from './Solicitud';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-solicitudes-empresa',
  templateUrl: './listar-solicitudes-empresa.component.html',
  styleUrls: ['./listar-solicitudes-empresa.component.css']
})
export class ListarSolicitudesEmpresaComponent implements OnInit {

  objSolicitudSeleccionada: Solicitud;
  constructor(
    private location: Location
  ) { }
  contador = 0;
  solicitudes = lstSolicitudes;
  ngOnInit() {
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
  ActivarDesactivar(objSolicitud: Solicitud): void {
    this.contador=0;
    this.solicitudes.forEach(element => {
      if (element.id === objSolicitud.id) {
        if (element.estado === 'En espera') {
          element.estado = 'Activo';
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
