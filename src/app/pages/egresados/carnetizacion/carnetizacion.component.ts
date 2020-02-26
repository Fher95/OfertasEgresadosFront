import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { Router } from '@angular/router';

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

  constructor(
    private catalogoService: CatalogosService,
    private servicioCompletar: RegistroService,
    private auth: AuthService,
    private router: Router
  ) {
    this.mensajeCompletar = " Aún no ha completado el registro, Presione 'Completar registro' para poder continuar.";
    this.mensajeEstado = 'Existen una solicitud de carnetización pendiente.';
    this.mensajeEstadoAceptado = 'Estado de solicitud es Aceptado';
    this.mensajeEstadoRechazado = 'Estado de solicitud es Rechazado.';
    this.mensajeEstadoEgresado = 'Aún no ha sido validado en el sistema por favor dirigirse al area de EGRESADOS';
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.servicioCompletar.idEgresado(this.auth.userEmail).subscribe(data => {
      this.idEgresado = data.id_aut_egresado;
      this.catalogoService
        .getEstadoEgresado(this.idEgresado)
        .subscribe(estado => (this.estadoEgres = estado));
      this.catalogoService
        .getEstadoInformacionEgresado(this.idEgresado)
        .subscribe(solCarnet => (this.estadoInfoEgresado = solCarnet.estado_completar));
      this.catalogoService
        .getEstadoSolicitudCarnet(this.idEgresado)
        .subscribe(estCarnet => {
          if(Object.keys(estCarnet).length > 0){
            this.estadoCarnet = estCarnet.estado_solicitud
          }else{
            this.estadoCarnet ='';
          }
        }
        );
    });
  }
  
  entro(number: number){
    console.log("aqui llego"+ number);
  }

  solicitudCarnet(solicitud: string) {
    console.log("esto es lo que se hace "+this.idEgresado);
    this.catalogoService.enviarSolicitudCarnet(this.idEgresado, solicitud).subscribe();

    //this.cargarDatos();
  }
}