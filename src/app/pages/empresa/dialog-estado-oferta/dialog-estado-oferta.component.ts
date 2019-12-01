import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogInfoOfertaComponent } from '../dialog-info-oferta/dialog-info-oferta.component';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { IEgresado } from 'src/app/shared/modelos/egresadoInterface';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-dialog-estado-oferta',
  templateUrl: './dialog-estado-oferta.component.html',
  styleUrls: ['./dialog-estado-oferta.component.css']
})
export class DialogEstadoOfertaComponent implements OnInit {

  private estado: String;
  private idEgresadoEscogido: String;
  private listaPostuladosEscogidos: IEgresado[]; //Si se está utilizando
  constructor(
    public dialogRef: MatDialogRef<DialogInfoOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosOferta: any,
    private empService: EmpresaService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.estado = this.datosOferta.estado_proceso;
  }
  
  /**
 * Carga los postulados si se selecciona el estado de la oferta: Finalizada con contratacion mediante
 * una peticion http.
 */
  cargarPostuladosSeleccionados() {
    this.empService.getPostuladosSeleccionadosOferta(this.datosOferta.id_empresa).subscribe(resultado => {
      console.log("postulados: ", resultado);
      this.listaPostuladosEscogidos = resultado;
    },
      error => {
        this.alert.showErrorMessage("Ha ocurrido un error", "No se pudo cargar los postulados a tu oferta. Por favor recarga la página o intenta más tarde")
        console.log('Error al obtener el listado de postulados seleccionados: ', JSON.stringify(error));
        this.onNoClick();
      });
  }

  /**
 * Cambia el estado de una oferta mediante una peticion al back.
 * Actualiza el atributo entrante "datosOferta" que viene desde ofertasPublicadasComponent
 */
  cambiarEstado() {
    let objOferta = {'estado_proceso':this.estado, 'idEgresadoEscogido':this.idEgresadoEscogido}
    this.empService.modificarEstadoOferta(this.datosOferta.id_aut_oferta, objOferta).subscribe(resultado => {
      if (resultado !== null) {
        this.datosOferta.estado_proceso = this.estado;
        this.alert.showSuccesMessage("Cambio exitoso", "Se cambió el estado correctamente");
      }
      this.dialogRef.close();
    },
      error => {
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde")
        console.log("Error al cambiar el estado: ", error);
        this.dialogRef.close();
      });
  }

  /**
 * Cierra el dialog
 */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
