import { Component, OnInit, Inject } from '@angular/core';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-referencia-egresado',
  templateUrl: './referencia-egresado.component.html',
  styleUrls: ['./referencia-egresado.component.css']
})
export class ReferenciaEgresadoComponent implements OnInit {
  referido: ReferenciaPersonalModel;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ReferenciaEgresadoComponent>
  ) {
    this.referido = data;
  }

  ngOnInit() {}

  cerrar() {
    this.dialogRef.close(false);
  }
}
