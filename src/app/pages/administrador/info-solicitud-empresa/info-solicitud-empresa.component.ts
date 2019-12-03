import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Solicitud } from '../listar-solicitudes-empresa/Solicitud';
import { ListarSolicitudesEmpresaComponent, DialogData } from '../listar-solicitudes-empresa/listar-solicitudes-empresa.component';
import { ListarSolicitudesService } from '../listar-solicitudes-empresa/listar-solicitudes.service';

@Component({
  selector: 'app-info-solicitud-empresa',
  templateUrl: './info-solicitud-empresa.component.html',
  styleUrls: ['./info-solicitud-empresa.component.css']
})
export class InfoSolicitudEmpresaComponent implements OnInit  {

  seleccionNumOfertas: number = 0 ;
  seleccionValida = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private servicioLista: ListarSolicitudesService) {}
  
  ngOnInit() {
    console.log("Entra al dialog");
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

  activarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null){
      this.servicioLista.activarSolicitud(parSolicitud.id_aut_empresa, this.seleccionNumOfertas)
        .subscribe(result => {
          console.log(result);
          //this.getSolicitudes();
          this.reiniciarSeleccion();
        });
    }
  }

  desactivarEmpresa(parSolicitud: Solicitud): void {
    if (parSolicitud != null){
      this.servicioLista.desactivarSolicitud(parSolicitud.id_aut_empresa)
        .subscribe(result => {
          console.log(result);
          //this.getSolicitudes();
          this.reiniciarSeleccion();
        });
    }
  }

}
