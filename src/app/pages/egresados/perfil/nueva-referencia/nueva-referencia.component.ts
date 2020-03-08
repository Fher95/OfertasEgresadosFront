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

  Nombre = new FormControl('', [Validators.required,Validators.maxLength(50)]);
  Egresado = new FormControl('', [Validators.required]);
  Correo = new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]);
  Celular = new FormControl('', [Validators.required, Validators.minLength(10)]);
  Parentesco = new FormControl('', [Validators.required]);

  listaParentesco: string[] = ['Pareja/Cónyuge', 'Padre', 'Madre', 'Abuelo/a', 'Hijo/a', 'Otro'];

  varReferido: Referido;

  constructor(@Inject(MAT_DIALOG_DATA) data,
  private dialogRef: MatDialogRef<Referido>, private dialog:MatDialog,private alert: AlertService) {
    this.varReferido=data;
    //this.limpiarDatos();
  }

  ngOnInit() {
  }

  guardarReferido() {    
    if(this.validarDatos()) {
      this.varReferido.nombres = this.Nombre.value;
      this.varReferido.parentesco = this.Parentesco.value;
      if (this.Egresado.value == 0) {
        this.varReferido.es_egresado = true;
        this.varReferido.id_nivel_educativo = this.programa.NivelAcademico.value;
        this.varReferido.id_aut_programa = this.programa.Programa.value;
        if(this.programa.Titulo.value!=''){
          this.varReferido.id_aut_titulo = this.programa.Titulo.value;
        }
      }
      else if (this.Egresado.value == 1) {
        this.varReferido.es_egresado = false;
      }
      this.varReferido.correo = this.Correo.value.toLowerCase();
      this.varReferido.telefono_movil = this.Celular.value;

      this.dialogRef.close(false);
    }
    else{
      this.alert.showErrorMessage('Error','Verifique todos los datos.');
    }
  }

  limpiarDatos() {
    this.varReferido = new Referido();
    this.Nombre = new FormControl('', [Validators.required,Validators.maxLength(50)]);
    this.Parentesco = new FormControl('', [Validators.required]);
    this.Egresado = new FormControl('', [Validators.required]);
    this.Correo = new FormControl('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]);
    this.Celular = new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}"),Validators.minLength(10)]);
  }
  validarDatos() { 
    var bandera=false;
    if(this.validarCampoVacio() && this.validarMensajeInvalido()){
      bandera=true;
    }    
    return bandera;
  }
  validarMensajeInvalido(){
    var bandera: boolean = false;
    if(this.Nombre.status == "VALID" && this.Parentesco.status == "VALID" && this.Egresado.status == "VALID" &&
        this.Correo.status == "VALID" && this.Celular.status == "VALID"){
          bandera = true;
    }
    return bandera;
  }
  validarCampoVacio(){
    var bandera: boolean = false;
    if (this.Nombre.value != '' && this.Egresado.value != '' && this.Correo.value != '' && this.Celular.value != ''
      && this.Parentesco.value != ''){
        if(this.Egresado.value == 0 && this.programa.verificarCampos()){
          bandera=true;
        }
        else if(this.Egresado.value == 1){
          bandera = true;
        }
        else{
          bandera=false;
        }
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