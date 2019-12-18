import { ReferenciaPersonalModel } from './../../../../../shared/modelos/referencia-personal.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-referencia-personal',
  templateUrl: './referencia-personal.component.html',
  styleUrls: ['./referencia-personal.component.css']
})
export class ReferenciaPersonalComponent implements OnInit {
  referido: ReferenciaPersonalModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ReferenciaPersonalModel>
  ) {
    this.referido = data;
  }

  ngOnInit() {}

  cerrar() {
    this.dialogRef.close(false);
  }
}
