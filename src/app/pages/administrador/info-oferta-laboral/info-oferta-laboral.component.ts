import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../listar-ofertas/listar-ofertas.component';
import { ListarOfertasService } from '../listar-ofertas/listar-ofertas.service';
import { Ubicacion } from '../listar-ofertas/OfertaLaboral';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-info-oferta-laboral',
  templateUrl: './info-oferta-laboral.component.html',
  styleUrls: ['./info-oferta-laboral.component.css']
})
export class InfoOfertaLaboralComponent implements OnInit {

  estadoActivacion: string;
  motivoInactivacion: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private servicioOfertas: ListarOfertasService,
              private _snackBar: MatSnackBar,
              private alert: AlertService) { }
  ngOnInit() {
    this.estadoActivacion = this.data.oferta.estado;
  }

  getStrUbicaciones(parUbicaciones: Ubicacion[]){
    if (parUbicaciones === null || parUbicaciones.length === 0) {
      return 'No especificado';
    } else {
      let strAreas = '';
      for (let index = 0; index < parUbicaciones.length; index++) {
        const element = parUbicaciones[index].nombre + ' (' + parUbicaciones[index].departamento + ')';
        strAreas += element;
        if (index < (parUbicaciones.length - 1)) {
          strAreas += ' - ';
        }
      }
      return strAreas;
    }
  }

  getSalario(parSalario: string): string{
    if (parSalario.includes('US')){
      return parSalario;  
    }
    const salarioSinSigno = parSalario.replace('$', '');
    const numSalario = +salarioSinSigno;
    const strNumero = '$' + numSalario.toLocaleString();
    return strNumero;
  }

  aprobarOfertaLaboral(){
    this.servicioOfertas.aprobarOferta(this.data.oferta.id_aut_oferta)
      .subscribe(result => {              
        this.servicioOfertas.notificarCambio();
        this.alert.showSuccesMessage("Cambio exitoso", "Oferta laboral aceptada");
        //this.openSnackBar('Oferta laboral "' + this.data.oferta.nombre_oferta + '" aceptada');
      });
  }

  desaprobarOfertaLaboral(){
    this.servicioOfertas.desaprobarOferta(this.data.oferta.id_aut_oferta, this.motivoInactivacion)
      .subscribe(result => {
        // this.getOfertas();
        this.servicioOfertas.notificarCambio();
        this.alert.showSuccesMessage("Cambio exitoso", "Oferta laboral rechazada");
        //this.openSnackBar('Oferta laboral "' + this.data.oferta.nombre_oferta + '" rechazada');
      });
  }

  guardarCambio() {
    if (this.estadoActivacion === 'Aceptada') {
      this.aprobarOfertaLaboral();
    } else if (this.estadoActivacion === 'Rechazada') {
      this.desaprobarOfertaLaboral();
    }

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
    });
  }

}
