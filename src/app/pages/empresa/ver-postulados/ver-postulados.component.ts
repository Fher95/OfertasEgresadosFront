import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IEgresado } from 'src/app/shared/modelos/egresadoInterface';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isNull, isUndefined } from 'util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

export interface DialogData {
  postulado: IEgresado;
  idOferta: string;
}

@Component({
  selector: 'app-ver-postulados',
  templateUrl: './ver-postulados.component.html',
  styleUrls: ['./ver-postulados.component.css']
})
export class VerPostuladosComponent implements OnInit {
  id: string;
  idOferta: string;
  listaPostulados: IEgresado[];
  postuladoSeleccionado: IEgresado;
  displayedColumns: string[] = ['Identificacion', 'Nombres', 'Apellidos', 'Estado', 'Acciones'];
  dataSource = new MatTableDataSource<IEgresado>(this.listaPostulados);
  arregloVacio = false;
  auxiliar = false;
  filtroEstado = '';
  nombreOferta: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.idOferta = this.activatedRoute.snapshot.paramMap.get('idOferta');
    this.listaPostulados = null;
    this.cargarDatosOferta();
    this.cargarPostulados();
  }

  cargarDatosOferta() {
    this.empresaService.getDatosOferta(this.idOferta).subscribe(
      result => {
        this.nombreOferta = result.informacionPrincipal.nombreOferta;
      }
    );
  }

  cargarPostulados() {
    this.empresaService.getPostuladosOferta(this.idOferta).subscribe(resultado => {
      this.listaPostulados = resultado.data as IEgresado[];
      if (resultado.status === "failure") {
        this.arregloVacio = true;
      }
      this.auxiliar = true;
      this.dataSource = new MatTableDataSource<IEgresado>(this.listaPostulados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      if (this.listaPostulados.length === 0 || isNull(this.listaPostulados)) {
        this.arregloVacio = true;
      }
    },
      error => {
        console.log('Error al obtener el listado de postulados: ', JSON.stringify(error));
        this.auxiliar = true;
        this.arregloVacio = true;
      });
  }

  setPostuladoActual(parPostulado: IEgresado) {
    this.postuladoSeleccionado = parPostulado;
    if (this.postuladoSeleccionado !== undefined || this.postuladoSeleccionado !== null) {
      const fechaActual = new Date();
      const strFecha = fechaActual.getFullYear() + '-' + fechaActual.getMonth() + '-' + fechaActual.getDay()
        + ' ' + fechaActual.getHours() + ':' + fechaActual.getMinutes();
      this.empresaService.guardarRegistroVisualizacionPostulado(this.postuladoSeleccionado.idEgresado, strFecha)
        .subscribe();
    }
    this.openDialog();
  }

  reiniciarSeleccion() {
    this.postuladoSeleccionado = undefined;
  }

  openDialog() {
    const dial = this.dialog.open(DialogPostuladoComponent, {
      data: {
        postulado: this.postuladoSeleccionado,
        idOferta: this.idOferta
      },
      width: '40vw'
    });
    this.dialogAbierto(dial);
  }

  dialogAbierto(dial: MatDialogRef<DialogPostuladoComponent, any>) {
    dial.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.cargarPostulados();
        }, 1500);
      }
    });
  }

  filtrar() {
    if (this.filtroEstado === 'Todos') {
      this.dataSource = new MatTableDataSource<IEgresado>(this.listaPostulados);
      if (this.listaPostulados.length === 0) {
        this.arregloVacio = true;
      } else { this.arregloVacio = false; }
    } else {
      const result: IEgresado[] = this.listaPostulados.filter(item => {
        return item.estado.toLowerCase() === this.filtroEstado.toLowerCase();
      });
      if (result.length === 0) {
        this.arregloVacio = true;
      } else { this.arregloVacio = false; }
      this.dataSource = new MatTableDataSource<IEgresado>(result);
    }
  }

  previousState() {
    window.history.back();
  }
}

@Component({
  selector: 'app-dialog-postulado',
  templateUrl: 'dialog-postulado.html',
})
export class DialogPostuladoComponent {

  postuladoSeleccionado: IEgresado;
  idOferta: string;
  estado: string = 'Pendiente';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private empresaService: EmpresaService,
    private _snackBar: MatSnackBar,
    private alert: AlertService) { }

  ngOnInit() {
    this.postuladoSeleccionado = this.data.postulado;
    this.idOferta = this.data.idOferta;
    this.estado = this.postuladoSeleccionado.estado;
  }

  guardarEstado() {
    this.empresaService.guardarEstadoPostulado(this.postuladoSeleccionado.idEgresado, this.idOferta, this.estado)
      .subscribe(result => {
        this.alert.showSuccesMessage("Cambio exitoso", 'Estado de "' + this.postuladoSeleccionado.nombres + ' ' + this.postuladoSeleccionado.apellidos + '" cambió a "' + this.estado + '"');
      }
      );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
    });
  }

}
