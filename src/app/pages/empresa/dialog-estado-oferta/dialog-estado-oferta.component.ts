import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogInfoOfertaComponent } from '../dialog-info-oferta/dialog-info-oferta.component';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';

@Component({
  selector: 'app-dialog-estado-oferta',
  templateUrl: './dialog-estado-oferta.component.html',
  styleUrls: ['./dialog-estado-oferta.component.css']
})
export class DialogEstadoOfertaComponent implements OnInit {

  private estado: String;

  constructor(
    public dialogRef: MatDialogRef<DialogInfoOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosOferta: any,
    private empService: EmpresaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log("datos en dialog:", this.datosOferta);
    this.estado = this.datosOferta.estado_proceso;
  }

  cambiarEstado() {
    this.empService.modificarEstadoOferta(this.datosOferta.id_empresa, this.datosOferta.id_aut_oferta, this.datosOferta).subscribe(resultado => {
      console.log("estado:", this.estado);
      console.log("resultado: ", resultado);
      this.datosOferta.estado = this.estado;
      this.snackBar.open("Cambio de estado correcto", "Aceptar", {
        duration: 5000
      });
      this.dialogRef.close();
    },
    error => {
      this.snackBar.open("Error al cambiar el estado, recargue la pagina e intentelo de nuevo", "Aceptar", {
        duration: 5000,
      });
      this.dialogRef.close();
      console.log("Error al cambiar el estado: ", error);
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
