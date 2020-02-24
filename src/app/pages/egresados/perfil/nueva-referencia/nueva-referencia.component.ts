import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { ProgramaComponent } from '../../programa/programa.component';
import { FormControl, Validators } from '@angular/forms';
import { Referido } from 'src/app/shared/modelos/referido';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { CancelarDialogComponent } from '../../cancelar-dialog/cancelar-dialog.component';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';

@Component({
  selector: 'app-nueva-referencia',
  templateUrl: './nueva-referencia.component.html',
  styleUrls: ['./nueva-referencia.component.css']
})
export class NuevaReferenciaComponent implements OnInit {
  @ViewChild('programa') programa: ProgramaComponent;

  Nombre = new FormControl('', [Validators.required]);
  Egresado = new FormControl('', [Validators.required]);
  Correo = new FormControl('', [Validators.required, Validators.email]);
  Celular = new FormControl('', [Validators.required, Validators.minLength(10)]);
  Parentesco = new FormControl('', [Validators.required]);

  listaParentesco: string[] = ['Pareja/Cónyuge', 'Padre', 'Madre', 'Abuelo/a', 'Hijo/a', 'Otro'];

  varReferido: Referido;

  constructor(@Inject(MAT_DIALOG_DATA) data,
  private dialogRef: MatDialogRef<Referido>, private dialog:MatDialog,private alert: AlertService) {
    this.varReferido=data;
    this.limpiarDatos();
  }

  ngOnInit() {
  }

  guardarReferido() {
    if (this.validarDatos()) {
      this.varReferido.nombres = this.Nombre.value.toUpperCase();
      this.varReferido.parentesco = this.Parentesco.value.toUpperCase();
      if (this.Egresado.value == 0) {
        this.varReferido.es_egresado = true;
        /*this.varReferido.id_nivel_educativo = this.programa.NivelAcademico.value;
        this.varReferido.id_aut_programa = this.programa.Programa.value;*/
      }
      else if (this.Egresado.value == 1) {
        this.varReferido.es_egresado = false;
      }
      this.varReferido.correo = this.Correo.value.toLowerCase();
      this.varReferido.telefono_movil = this.Celular.value;
      this.dialogRef.close(false);
    }
    else{
      this.alert.showErrorMessage('Error','Complete todos los datos.');
    }
  }

  limpiarDatos() {
    this.varReferido = new Referido();
    this.Nombre = new FormControl('', [Validators.required]);
    this.Parentesco = new FormControl('', [Validators.required]);
    this.Egresado = new FormControl('', [Validators.required]);
    this.Correo = new FormControl('', [Validators.required, Validators.email]);
    this.Celular = new FormControl('', [Validators.required, Validators.minLength(10)]);
  }
  validarDatos() {  
    var bandera: boolean = false;

    if (this.Nombre.value != '' && this.Egresado.value != '' && this.Correo.value != '' && this.Celular.value != ''
      && this.Parentesco.value != '') {
      bandera = true;
    }
    return bandera;
  }
  cancelar(){
    this.dialog.open(CancelarDialogComponent).afterClosed().subscribe(
      resultado => { 
        if(resultado==0){
          this.limpiarDatos();
          this.dialogRef.close(false);
        }});
  }
}