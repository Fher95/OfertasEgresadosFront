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
    this.solicitudes = []
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

  private enviarSolicitudCarnet(idSolicitud, index, estado) {


    let mensaje: string;
    if(estado== "RECHAZADO"){
      mensaje = '¿Cancelar solicitud?';
    }else{
      mensaje = '¿Aceptar Solicitud?';
    }
    this.alert.showconfirmationMessage(mensaje, 'Para continuar presione Aceptar.').then((result) => {
      if (result.value) {
        this.catalogoService.enviarRespuestaSolicitud(idSolicitud, estado).subscribe(result=>{ console.log("si funciona")});
        this.solicitudes.splice(index, 1);
      }
    });
  }

 /*  private cancelarSolicitudCarnet(solicitud,index, estado) {
    this.alert.showconfirmationMessage('¿Cancelar solicitud?', 'Para continuar presione Aceptar.').then((result) => {
      if (result.value) {
        this.catalogoService.enviarRespuestaSolicitud(solicitud, estado).subscribe();
        this.solicitudes.splice(index, 1);
      }
    });
    sudo apt install php7.2-cli
  } */
}

