import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';

@Component({
  selector: 'app-dialog-info-oferta',
  templateUrl: './dialog-info-oferta.component.html',
  styleUrls: ['./dialog-info-oferta.component.css']
})
export class DialogInfoOfertaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogInfoOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosOferta: any,
    private empService: EmpresaService
  ) { }

  ngOnInit() {
    console.log("datos en dialog:", this.datosOferta);
  }

  cambiarEstado(estado: string) {
    this.empService.modificarEstadoOferta(this.datosOferta.id_empresa, this.datosOferta.id_aut_oferta, this.datosOferta).subscribe(resultado => {
      console.log(resultado);
      this.datosOferta.estado = estado;
    },
    error => {
      alert("Error al cambiar el estado");
      console.log("Error al cambiar el estado: ", error);
    });
  }

  eliminarOferta() {
    this.empService.eliminarOferta(this.datosOferta.id_empresa, this.datosOferta.id_aut_oferta);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
