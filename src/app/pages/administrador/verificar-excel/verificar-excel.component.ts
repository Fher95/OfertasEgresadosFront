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
   * InputFile para subir el archivo de secretaria.
   */
  @ViewChild('fileInput') fileInput;

  /**
   * Tablas de resultados
   */
  @ViewChild('tblAceptados') tblAceptados: ListaEgresadosComponent;

  /**
   * Estados para mostrar componentes
   */
  processFinished: boolean;
  showSpinner: boolean;
  showActivos: boolean;
  showPendientes: boolean;
  showInconsistentes: boolean;

  constructor(private service: FileUploadService) { }

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

  uploadFile() {
    this.showSpinner = true;
    const formData = new FormData();
    console.log(this.fileInput.nativeElement.files[0]);
    formData.append('fileInput', this.fileInput.nativeElement.files[0]);
    this.service.uploadFile(formData).subscribe((data) => {
      this.processFinished = true;
      this.showSpinner = false;
    });
  }
}
