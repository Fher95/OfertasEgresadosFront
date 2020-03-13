import { Component, OnInit, Inject } from '@angular/core';
import { ExperienciaModel } from 'src/app/shared/modelos/experiencia.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-trabajo-actual-egresado',
  templateUrl: './trabajo-actual-egresado.component.html',
  styleUrls: ['./trabajo-actual-egresado.component.css']
})
export class TrabajoActualEgresadoComponent implements OnInit {
  experiencia: ExperienciaModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<TrabajoActualEgresadoComponent>
  ) {
    this.experiencia = data;
  }

  ngOnInit() {  
  }

  cerrar() {
    this.dialogRef.close();
  }
}
