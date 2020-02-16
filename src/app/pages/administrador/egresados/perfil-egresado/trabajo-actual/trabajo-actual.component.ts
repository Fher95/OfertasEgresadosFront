import { ExperienciaModel } from './../../../../../shared/modelos/experiencia.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-trabajo-actual',
  templateUrl: './trabajo-actual.component.html',
  styleUrls: ['./trabajo-actual.component.css']
})
export class TrabajoActualComponent implements OnInit {
  private experiencia: ExperienciaModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<TrabajoActualComponent>
  ) {
    this.experiencia = data;
  }

  ngOnInit() {}

  cerrar() {
    this.dialogRef.close();
  }
}
