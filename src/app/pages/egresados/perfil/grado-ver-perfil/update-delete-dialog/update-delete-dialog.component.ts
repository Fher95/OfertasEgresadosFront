import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateInformacionPersonalModel } from 'src/app/shared/modelos/update-informacion-personal.model';
import { SedeInterface } from 'src/app/shared/modelos/sedeInterface';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { FacultadInterface } from 'src/app/shared/modelos/facultadInterface';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';
import { ProgramaInterface } from 'src/app/shared/modelos/programaInteface';
import { TituloInterface } from 'src/app/shared/modelos/tituloInterface.';

@Component({
  selector: 'app-update-delete-dialog',
  templateUrl: './update-delete-dialog.component.html',
  styleUrls: ['./update-delete-dialog.component.css']
})
export class UpdateDeleteDialogComponent implements OnInit {
  action: string;
  local_data: any;

  new_data: any;

  sedes: SedeInterface[] = [];
  facultades: FacultadInterface[] = [];
  nivelesEstudio: NivelesEstudioInterface[] = [];
  programas: ProgramaInterface[] = [];
  titulos: TituloInterface[] = [];

  filtroProgramas: {
    idSede: number;
    idFacultad: number;
    idNivelEstudio: number;
  };

  idPrograma: number;


  constructor(
    public dialogRef: MatDialogRef<UpdateInformacionPersonalModel>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private catalogService: CatalogosService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.new_data = {};
  }

  ngOnInit() {
    this.catalogService.getSede().subscribe(sedes => (this.sedes = sedes));
    this.catalogService
      .getFacultad()
      .subscribe(facultades => (this.facultades = facultades));
    this.catalogService
      .getNivelAcademico()
      .subscribe(nivelesEstudio => (this.nivelesEstudio = nivelesEstudio));
  }

  onSedeChange(idSede: number) {
    this.filtroProgramas.idSede = idSede;
    this.loadPrograms();
  }

  onFacultadChange(idFacultad: number) {
    this.filtroProgramas.idFacultad = idFacultad;
    this.loadPrograms();
  }

  onNivelEstudioChange(idNivelEstudio: number) {
    this.filtroProgramas.idNivelEstudio = idNivelEstudio;
    this.loadPrograms();
  }

  loadPrograms() {
    const cantidadUndefined = Object.entries(this.filtroProgramas).filter(
      (value, key) => {
        return value != undefined;
      }
    ).length;
    if (cantidadUndefined === 3) {
      // Cargar programas
      this.catalogService
        .getPrograma(
          this.filtroProgramas.idSede,
          this.filtroProgramas.idFacultad,
          this.filtroProgramas.idNivelEstudio
        )
        .subscribe(programas => (this.programas = programas));
    } else {
      // Limpriar programas y títulos
      this.programas = [];
      this.titulos = [];
    }
  }

  onProgramaChange(idPrograma: number)
  {
    // Cargar titulos
    this.catalogService.getTitulo(idPrograma).subscribe(titulos => this.titulos = titulos);
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
