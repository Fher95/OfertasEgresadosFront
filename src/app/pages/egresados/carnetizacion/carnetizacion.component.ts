import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';

@Component({
  selector: 'app-carnetizacion',
  templateUrl: './carnetizacion.component.html',
  styleUrls: ['./carnetizacion.component.css']
})
export class CarnetizacionComponent implements OnInit {

  private idEgresado: number;

  private mensajeCompletar: String;
  private mensajeEstado: String;
  private mensajeEstado2: String;
  private mensajeEstadoAceptado: String;
  private mensajeEstadoRechazado: String;

  constructor(private servicioCompletar: RegistroService,private auth: AuthService) {
    this.mensajeCompletar = " Aun no ha completado el registro, Presione 'Completar registro' para poder continuar.";
    this.mensajeEstado2 = "Existen una solicitud de carnetización pendiente.";
    this.mensajeEstado = "No existe solicitud de carnetización pendiente.";
    this.mensajeEstadoAceptado = "Estado de solicitud es Aceptado";
    this.mensajeEstadoRechazado = "Estado de solicitud es Rechazado.";
  }



  ngOnInit() {
  }

  obtenerIdegresado(){
    this.servicioCompletar.idEgresado(this.auth.userEmail).subscribe(
      data => this.idEgresado = data);
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
