import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { Validators, FormControl } from '@angular/forms';
import { ProgramaComponent } from '../../programa/programa.component';
import { Referido } from 'src/app/shared/modelos/referido';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';

@Component({
  selector: 'app-referido-perfil',
  templateUrl: './referido-perfil.component.html',
  styleUrls: ['./referido-perfil.component.css']
})
export class ReferidoPerfilComponent implements OnInit {
  @ViewChild('programa') programa: ProgramaComponent;

  referido: ReferenciaPersonalModel;
  varGuardar:boolean =false;
  varEditar:boolean=true;

  Correo = new FormControl({value:'',disabled:true}, [Validators.required, Validators.email]);
  Celular = new FormControl({value:'',disabled:true}, [Validators.required, Validators.minLength(10)]);
  Egresado = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<Referido>, private alert : AlertService, private dialog : MatDialog
  ) {
    this.referido = data;
  }

  ngOnInit() {}

  editar(){
    this.varEditar=false;
    this.varGuardar=true;
    this.Correo = new FormControl({value: this.referido.correo,disabled:false}, [Validators.required, Validators.email]);
    this.Celular = new FormControl({value: this.referido.telefonoMovil,disabled:false}, [Validators.required, Validators.minLength(10)]);
  }
  guardar(){
    if(this.validarDatos()){
      this.referido.correo = this.Correo.value.toLowerCase();
      this.referido.telefonoMovil = this.Celular.value;
      if(this.Egresado.value==0){
        this.referido.esEgresado = true;
        //this.referido.programa.titulo = this.programa.NivelAcademico.value;
        console.log('Antes de');
        this.referido.programa.idPrograma = this.programa.Programa.value;
        console.log('Programa: id '+this.referido.programa.idPrograma);
        console.log('progra nombre: '+this.referido.programa.Nombre);
      }
      else if(this.Egresado.value==1){
        this.referido.esEgresado = false;
      }
      this.alert.showSuccesMessage('','Modificación exitosa.');
      this.dialogRef.close(false);
    }
    else{
      this.alert.showErrorMessage('Error','Verifique todos los datos.');
    }
  }
  cancelar(){
    if(this.varGuardar){
      this.alert.showconfirmationMessage('Cancelar','¿Desea cancelar la actualización?').then(
        resultado => { 
          if(resultado.value){
            this.dialogRef.close(false);
      }});  
    }
    else{
      this.dialogRef.close(false);
    }
  }
  validarDatos() {  
    var bandera: boolean = false;
    if (this.Correo.value != '' && this.Celular.value != '' && this.Egresado.value !='') {
      bandera = true;
    }
    return bandera;
  }
}