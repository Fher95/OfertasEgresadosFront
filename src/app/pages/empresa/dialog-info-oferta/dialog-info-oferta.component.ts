import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-info-oferta',
  templateUrl: './dialog-info-oferta.component.html',
  styleUrls: ['./dialog-info-oferta.component.css']
})
export class DialogInfoOfertaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogInfoOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
  ) { }

  datosOferta ;
  ngOnInit() {
    console.log("datos en dialog:", this.datos);
    this.datosOferta = this.datos.datos;
    console.log(this.datosOferta)
    console.log(this.datosOferta.requisitos.preguntasCandidato.length)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
