import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carnetizacion',
  templateUrl: './carnetizacion.component.html',
  styleUrls: ['./carnetizacion.component.css']
})
export class CarnetizacionComponent implements OnInit {


  private mensajeCompletar: String;
  private mensajeEstado: String;
  private mensajeEstado2: String;
  private mensajeEstadoAceptado: String;
  private mensajeEstadoRechazado: String;

  constructor() {
    this.mensajeCompletar = " Aun no ha completado el registro, Presione 'Completar registro' para poder continuar.";
    this.mensajeEstado2 = "Existen una solicitud de carnetización pendiente.";
    this.mensajeEstado = "No existe solicitud de carnetización pendiente.";
    this.mensajeEstadoAceptado = "Estado de solicitud es Aceptado";
    this.mensajeEstadoRechazado = "Estado de solicitud es Rechazado.";
  }



  ngOnInit() {
  }

  estadoEgresado() {
    return true;
  }

  estadoSolicitudCarnet() {
    return true;
  }
  estadoSolicitud() {
    return this.estadoSolicitudCarnet();
  }


}
