import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

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
  private mensajeSolicitar: string;
  private mensajeCancelar: string;

  constructor(
    private catalogoService: CatalogosService,
    private servicioCompletar: RegistroService,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {
    this.mensajeCompletar = " Aún no ha completado el registro, Presione 'Completar' para poder continuar.";
    this.mensajeEstado = 'Tu solicitud de carnetización aún no ha sido respondida';
    this.mensajeEstadoAceptado = 'Tu solicitud de carnetización ha sido ACEPTADA';
    this.mensajeEstadoRechazado = 'Tu solicitud de carnetización ha sido RECHAZADA.';
    this.mensajeEstadoEgresado = 'Aún no ha sido validado en el sistema, por favor dirigirse al área de EGRESADOS';
    this.mensajeSolicitar = '¿Deseas solicita de nuevo tu carnet?';
    this.mensajeCancelar = '¿Deseas cancelar la solicitud de tu carnet?';
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
  
  solicitudCarnet(solicitud: string) {
    let mensaje: string;
    if(solicitud == "PENDIENTE"){
      this.catalogoService.enviarSolicitudCarnet(this.idEgresado, solicitud).subscribe(res=>{
        this.alert
              .showSuccesMessage(
                '',
                "Solicitud de carnet enviada."
              )
              .then(result => {
                if (result.value) {
                  this.router.navigateByUrl('/egresados');
                } 
              });
      });
    }else{
        this.alert.showconfirmationMessage(
                '¿cancelar solicitud de carnet?.',
                "Para continuar presione Aceptar."
              )
              .then(result => {
                if (result.value) {
                  this.catalogoService.enviarSolicitudCarnet(this.idEgresado, solicitud).subscribe(res=>{
                    this.alert
                    .showSuccesMessage(
                      '',
                      "Solicitud de carnet cancelada."
                    )
                    .then(result => {
                      if (result.value) {
                        this.router.navigateByUrl('/egresados');
                      } 
                    });
                  });
                } 
              });
    }
    
    

    //this.cargarDatos();
  }
}