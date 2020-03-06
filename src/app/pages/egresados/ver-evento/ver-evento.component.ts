
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { EventoInterface } from '../../../shared/modelos/evento';
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { Utilities } from '../../../shared/servicios/egresados/utilities';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.component.html',
  styleUrls: ['./ver-evento.component.css']
})
export class VerEventoComponent implements OnInit {


  eventImageApi = `${environment.baseUrl}image/`;
  
    // Variables para configurar las fechas
    private startDateControl: FormControl;

    private nombre: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private dialog: MatDialogRef<any>, private servicios: CatalogosService) { 
     
  }

  ngOnInit() {
    this.nombre = this.data.event.nombre;
    console.log("esto es "+this.nombre);
  }
  // Funcion que calcula la minima fecha de fin a partir de la fecha de inicio seleccionada
  calculateMinEndDate() {
    return new Date(this.startDateControl.value);
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.data.event.nombre.length > 0 && this.data.event.descripcion.length > 0 && this.startDateControl.value != null;
  }

  // Funcion para cerrar el dialogo
  closeDialog() {
      this.dialog.close(true);
  }
 

}

export interface Data {
  event: EventoInterface
}
