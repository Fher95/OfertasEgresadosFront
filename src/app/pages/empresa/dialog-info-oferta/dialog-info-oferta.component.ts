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
    @Inject(MAT_DIALOG_DATA) public datos: any, // Datos enviaidos de la oferta
  ) { }
  datosOferta ;
  ngOnInit() {
    this.datosOferta = this.datos.datos;
    console.log("estado:", this.datos.estado);
  }
  
  formatNumber(rangoSalarial:string){
    let rangoMinimo
    let rangoMaximo
    let separadorRango=rangoSalarial.split(" ")
    if(this.datosOferta.contrato.formaPago === 'Moneda local')
    {
       rangoMinimo=separadorRango[1].split("$")[1]
       rangoMaximo=separadorRango[3].split("$")[1]
    }
    else{
      rangoMinimo=separadorRango[1]
      rangoMaximo=separadorRango[4]
    }
    rangoMinimo = new Intl.NumberFormat("de-DE").format(rangoMinimo)
    rangoMaximo = new Intl.NumberFormat("de-DE").format(rangoMaximo)
    return 'Entre $'+rangoMinimo+' y $'+rangoMaximo
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
