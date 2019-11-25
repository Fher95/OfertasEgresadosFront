import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/shared/servicios/egresados/file-upload.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EgresadoVerificar } from 'src/app/shared/modelos/egresadosVerificarInterface';
import { RespuestaVerificarExcel } from 'src/app/shared/modelos/respuestaVerificarEgresados';

const DATA: EgresadoVerificar[] = [
  { nombres: "Sebastián David", apellidos: "Carabali", identificacion: "1061748961" }
];

@Component({
  selector: 'app-verificar-excel',
  templateUrl: './verificar-excel.component.html',
  styleUrls: ['./verificar-excel.component.css']
})
export class VerificarExcelComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  showAceptados: boolean;
  showPendientes: boolean;
  showRechazados: boolean;
  processFinished: boolean;
  aceptadosDataSource: MatTableDataSource<EgresadoVerificar>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['nombres', 'apellidos', 'identificacion', 'titulo'];
  showSpinner: boolean;

  constructor(private service: FileUploadService) { }

  ngOnInit() {
    this.showAceptados = false;
    this.showPendientes = false;
    this.showRechazados = false;
    this.processFinished = false;
    this.showSpinner = false;
  }

  mostrarAceptados() {
    this.showAceptados = true;
    this.showPendientes = false;
    this.showRechazados = false;
  }

  mostrarPendientes() {
    this.showAceptados = false;
    this.showPendientes = true;
    this.showRechazados = false;
  }

  mostrarRechazados() {
    this.showAceptados = false;
    this.showPendientes = false;
    this.showRechazados = true;
  }


  uploadFile() {
    this.showSpinner = true;
    let formData = new FormData();    
    console.log(this.fileInput.nativeElement.files[0]);
    formData.append('fileInput', this.fileInput.nativeElement.files[0]);
    this.service.uploadFile(formData).subscribe((data) => {
      let aceptados = data;
      this.processFinished = true;
      this.aceptadosDataSource = new MatTableDataSource(aceptados);
      this.aceptadosDataSource.paginator = this.paginator;
      this.showSpinner = false;
    });
  }

}
