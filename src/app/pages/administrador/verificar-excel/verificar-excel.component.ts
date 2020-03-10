import { AlertService } from './../../../shared/servicios/common/alert.service';
import { ListaEgresadosComponent } from './lista-egresados/lista-egresados.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/shared/servicios/egresados/file-upload.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EgresadoVerificar } from 'src/app/shared/modelos/egresadosVerificarInterface';
import { RespuestaVerificarExcel } from 'src/app/shared/modelos/respuestaVerificarEgresados';

@Component({
  selector: 'app-verificar-excel',
  templateUrl: './verificar-excel.component.html',
  styleUrls: ['./verificar-excel.component.css']
})
export class VerificarExcelComponent implements OnInit {
  /**
   * Tablas de resultados
   */
  @ViewChild('tblAceptados')
  private tblAceptados: ListaEgresadosComponent;

  @ViewChild('tblPendientes')
  private tblPendientes: ListaEgresadosComponent;

  @ViewChild('tblInconsistentes')
  private tblInconsistentes: ListaEgresadosComponent;

  /**
   * Estados para mostrar componentes
   */
  processFinished: boolean;
  showSpinner: boolean;
  showActivos: boolean;
  showPendientes: boolean;
  showInconsistentes: boolean;

  /**
   * Datos de pendientes, activos e inconsistentes
   */
  activos: MatTableDataSource<any>;
  pendientes: MatTableDataSource<any>;
  inconsistentes: MatTableDataSource<any>;

  constructor(
    private service: FileUploadService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.showActivos = false;
    this.showPendientes = false;
    this.showInconsistentes = false;
    this.processFinished = false;
    this.showSpinner = false;
  }

  mostrarActivos() {
    this.showActivos = true;
    this.showPendientes = false;
    this.showInconsistentes = false;
  }

  mostrarPendientes() {
    this.showActivos = false;
    this.showPendientes = true;
    this.showInconsistentes = false;
  }

  mostrarInconsistentes() {
    this.showActivos = false;
    this.showPendientes = false;
    this.showInconsistentes = true;
  }

  verificarArchivo(file: File) {
    this.showSpinner = true;
    const formData = new FormData();
    formData.append('fileInput', file);
    this.service.uploadFile(formData).subscribe(
      response => {
        this.procesarRespuesta(response);
        this.processFinished = true;
        this.showSpinner = false;
      },
      err => {
        this.showSpinner = false;
        if (err.error.code == 701) {
          this.alert.showErrorMessage('Error', err.error.error);
        } else {
          this.alert.showErrorMessage(
            'Error',
            'Error inesperado comuniquese con el administrador del sistema'
          );
        }
      }
    );
  }

  private procesarRespuesta(response) {
    this.pendientes = new MatTableDataSource<any>(response.data.pendientes);
    this.activos = new MatTableDataSource<any>(response.data.aceptados);
    this.inconsistentes = new MatTableDataSource<any>(
      response.data.inconsistentes
    );
  }
}
