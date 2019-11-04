import { Component, Inject } from '@angular/core';

// Componentes de Angular Material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public info: Information) {
  }


}

// interfaz requerida para enviar información
export interface Information {
  title: String,
  message: String
}
