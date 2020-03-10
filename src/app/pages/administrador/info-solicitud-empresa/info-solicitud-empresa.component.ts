import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Solicitud } from '../listar-solicitudes-empresa/Solicitud';
import { DialogData } from '../listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { ListarSolicitudesService } from '../listar-solicitudes-empresa/listar-solicitudes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-info-solicitud-empresa',
  templateUrl: './info-solicitud-empresa.component.html',
  styleUrls: ['./info-solicitud-empresa.component.css']
})
export class InfoSolicitudEmpresaComponent implements OnInit {

  seleccionNumOfertas: number = 0;
  seleccionValida = false;
  limitePublicaciones = 50;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private servicioLista: ListarSolicitudesService,
    private _snackBar: MatSnackBar,
    private alert: AlertService) { }

  ngOnInit() {

  }


  getEstado(parEstado: string): string {
    /*if (parEstado === null) {
      return 'En Espera';
    } else if (parEstado) {
      return 'Activo';
    } else { return 'Inactivo'; }*/
    return parEstado;
  }

  activacionValida(): void {
    if (this.seleccionNumOfertas > 0) {
      if (this.seleccionNumOfertas <= this.limitePublicaciones) {
        this.seleccionValida = true;
      } else { this.seleccionValida = false; }
    } else {
      this.seleccionValida = false;
    }
  }

  reiniciarSeleccion(): void {
    this.seleccionNumOfertas = 0;
    this.seleccionValida = false;
  }

  activarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null) {
      this.servicioLista.activarSolicitud(parSolicitud.id_aut_empresa, this.seleccionNumOfertas)
        .subscribe(result => {
          this.alert.showSuccesMessage("Cambio de estado correcto", 'Empresa "' + parSolicitud.nombre + '" activada');
          //this.openSnackBar('Empresa "' + parSolicitud.nombre + '" activada');
          // this.getSolicitudes();          
          this.reiniciarSeleccion();
        });
    }
  }

  desactivarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null) {
      this.servicioLista.desactivarSolicitud(parSolicitud.id_aut_empresa)
        .subscribe(result => {
          this.alert.showSuccesMessage("Cambio de estado correcto", 'Empresa "' + parSolicitud.nombre + '" desactivada');
          //this.openSnackBar('Empresa "' + parSolicitud.nombre + '" desactivada');
          // this.getSolicitudes();          
          this.reiniciarSeleccion();
        });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
    });
  }

  getUrlEmpresa(parUrl: string): string {
    const urlCompleta = 'http://'.concat(parUrl);
    return urlCompleta;
  }

}
