import { Component, OnInit } from '@angular/core';
import { SolicitudInterface } from '../../../shared/modelos/solicitudeInterface'
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';


@Component({
  selector: 'app-solicitud-carnetizacion',
  templateUrl: './solicitud-carnetizacion.component.html',
  styleUrls: ['./solicitud-carnetizacion.component.css']
})
export class SolicitudCarnetizacionComponent implements OnInit {
  private solicitudes: SolicitudInterface[];
  private solicitudesAceptadas: SolicitudInterface[] = [];
  private solicitudesCanceladas: SolicitudInterface[] = [];
  private dia = new Date().getDate();
  private mes = new Date().getMonth() + 1;
  private anio = new Date().getFullYear();
  private fecha: String = this.dia + "/" + this.mes + "/" + this.anio

  constructor(private alert: AlertService, private dialog: MatDialog, private catalogoService: CatalogosService, private router: Router) {
    this.solicitudes = [{
      id_aut_carnetizacion: 1,
      nombres: 'Edinsson',
      apellidos: 'Lopez',
      correo: 'Edinsson@hotmail.com',
      identificacion: 1,
      fecha_solicitud: this.fecha
    }]
  }

  ngOnInit() {
    //this.obtenerSolicitudes();
    this.obtenerSolicitudesCarnet()

  }

  obtenerInformacionMensaje() {
    return this.solicitudes == null || this.solicitudes.length == 0 ? "No hay solicitudes pendientes" : "Solicitudes de carnetización pendientes: " + this.solicitudes.length;
  }

  obtenerNombreCorto(nombre, apellido) {
    var nombres = nombre.split(' ');
    var apellidos = apellido.split(' ');
    return nombres[0] + " " + apellidos[0];

  }

  /*   private obtenerSolicitudes() {
      return this.solicitudes;
      
    } */

  private obtenerSolicitudesCarnet() {
    this.catalogoService.getSolicitudesCarnet().subscribe(data => this.solicitudes = data);
  }

  private aceptarSolicitud(solicitud, index) {
    this.alert.showconfirmationMessage('¿Aceptar Solicitud?', 'Para continuar presione Aceptar.').then((result) => {
      if (result.value) {
        this.catalogoService.enviarEstadoSolicitud(solicitud, false).subscribe();
        this.solicitudes.splice(index, 1);
      }
    });


  }

  private cancelarSolicitud(solicitud, index) {
    this.alert.showconfirmationMessage('¿Cancelar solicitud?', 'Para continuar presione Aceptar.').then((result) => {
      if (result.value) {
        this.catalogoService.enviarEstadoSolicitud(solicitud, false).subscribe();
        this.solicitudes.splice(index, 1);
      }
    });
  }
}
