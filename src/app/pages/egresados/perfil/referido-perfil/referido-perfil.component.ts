import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { Validators, FormControl } from '@angular/forms';
import { CancelarDialogComponent } from '../../cancelar-dialog/cancelar-dialog.component';
import { ProgramaComponent } from '../../programa/programa.component';
import { Referido } from 'src/app/shared/modelos/referido';

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
    private dialogRef: MatDialogRef<ReferenciaPersonalModel>, private alert : AlertService, private dialog : MatDialog
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
        /*this.referido.id_nivel_educativo = this.programa.NivelAcademico.value;
        this.referido.id_aut_programa = this.programa.Programa.value;*/
      }
      this.alert.showSuccesMessage('','Modificación exitosa.');
      this.dialogRef.close(false);
    }
    else
    {
      this.alert.showErrorMessage('Error','Complete todos los datos.');
    }
  }
  cancelar(){
    if(this.varGuardar){
      this.dialog.open(CancelarDialogComponent).afterClosed().subscribe(
        resultado => { 
          if(resultado==0){
            this.dialogRef.close(false);
      }});  
    }
    else{
      this.dialogRef.close(false);
    }
  }
  validarDatos() {  
    var bandera: boolean = false;

    if (this.Correo.value != '' && this.Celular.value != '') {
      bandera = true;
    }
    return bandera;
  }
}