import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';

@Component({
  selector: 'app-carnetizacion',
  templateUrl: './carnetizacion.component.html',
  styleUrls: ['./carnetizacion.component.css']
})
export class CarnetizacionComponent implements OnInit {

  private idEgresado: number;

  private estadoEgres: boolean;
  private estadoInfoEgresado: boolean;
  private estadoCarnet: String;

  private mensajeCompletar: String;
  private mensajeEstado: String;
  private mensajeEstadoAceptado: String;
  private mensajeEstadoRechazado: String;
  private mensajeEstadoEgresado: String;

  constructor(private catalogoService: CatalogosService, private servicioCompletar: RegistroService, private auth: AuthService) {
    this.mensajeCompletar = " Aún no ha completado el registro, Presione 'Completar registro' para poder continuar.";
    this.mensajeEstado = "Existen una solicitud de carnetización pendiente.";
    this.mensajeEstadoAceptado = "Estado de solicitud es Aceptado";
    this.mensajeEstadoRechazado = "Estado de solicitud es Rechazado.";
    this.mensajeEstadoEgresado = "Aún no ha sido validado en el sistema por favor dirigirse al area de EGRESADOS";
   }



  ngOnInit() {
    this.estadoEgresado();
    this.obtenerIdEgresado();
    this.estadoInformacionEgresado();
    this.estadoSolicitudCarnet();
  }

  obtenerIdEgresado() {
    this.servicioCompletar.idEgresado(this.auth.userEmail).subscribe(
      data => this.idEgresado = data);
  }

  estadoEgresado() {
    this.catalogoService.getEstadoEgresado(this.idEgresado).subscribe(data => this.estadoEgres = data);
  }

  estadoSolicitudCarnet() {
    this.catalogoService.getEstadoSolicitudCarnet(this.idEgresado).subscribe(data => this.estadoCarnet = data);
  }
  estadoInformacionEgresado() {
    this.catalogoService.getEstadoInformacionEgresado(this.idEgresado).subscribe(data => this.estadoInfoEgresado = data);
  }

  enviarSolicitudCarnet(){
    //this.catalogoService.enviarSolicitudCarnet(this.idEgresado).subscribe()
    console.log("si funcionan los botones");
  }
  
  cancelarSolicitudCarnet(){
    //this.catalogoService.cancelarSolicitudCarnet(this.idEgresado).subscribe()
    console.log("si funcionan los botones cancelar");
  }

}
