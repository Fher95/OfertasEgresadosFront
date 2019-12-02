import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ProgramaComponent } from '../programa/programa.component';
import { Referido } from 'src/app/shared/modelos/referido';
import { MatDialog, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Router } from '@angular/router';

export interface DialogData {
  varTitulo: string;
  varMensaje: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-referido',
  templateUrl: './referido.component.html',
  styleUrls: ['./referido.component.css']
})

export class ReferidoComponent implements OnInit {
  @ViewChild('programa') programa : ProgramaComponent;

  Nombre = new FormControl('', [Validators.required]);
  Egresado = new FormControl('', [Validators.required]);
  Correo = new FormControl('', [Validators.required,Validators.email]);
  Celular = new FormControl('', [Validators.required,Validators.minLength(13)]);
  Parentesco = new FormControl('', [Validators.required]);
  
  listaParentesco : string[] = ['Pareja/Cónyuge','Padre','Madre','Abuelo/a','Hijo/a','Otro'];
  
  varReferido : Referido;
  referidos = new Array<Referido>();
  tituloInfo: string;
  mensajeInfo: string;

  constructor(private dialog:MatDialog, private router:Router) 
  {
    this.limpiarDatos();
  }

  ngOnInit() {
  }

  limpiarDatos(){
    this.varReferido = new Referido();
    this.referidos = new Array<Referido>();
    this.Nombre = new FormControl('', [Validators.required]);
    this.Parentesco = new FormControl('', [Validators.required]);
    this.Egresado = new FormControl('', [Validators.required]);
    this.Correo = new FormControl('',[Validators.required,Validators.email]);
    this.Celular = new FormControl('', [Validators.required,Validators.minLength(13)]);
  }
  validarDatos(){
    console.log('Validacion referidos');
    
    var bandera:boolean = false;
    
    console.log('Nombre '+this.Nombre.value+"Egresado "+this.Egresado.value+"Correo "+this.Correo.value+"Celular "
    +this.Celular.value+"Parentesco "+this.Parentesco.value);

    if(this.Nombre.value!='' && this.Egresado.value!='' && this.Correo.value!='' && this.Celular.value!='' 
      && this.Parentesco.value!=''){
      bandera = true;
    }
    else{
      this.tituloInfo="Información Faltante";
      this.mensajeInfo="Faltan datos por ingresar.";
    }
    return bandera;
  }
  referidoDatos(){
    console.log('entro referido');
    if(this.validarDatos()){
      this.varReferido.nombres = this.Nombre.value;
      this.varReferido.parentesco = this.Parentesco.value;
      if(this.Egresado.value==0){
        this.varReferido.es_egresado = true;
        //this.varReferido.id_nivel_educativo = this.programa.NivelAcademico.value;
        this.varReferido.id_aut_programa = this.programa.Programa.value;
      }
      else if(this.Egresado.value==1){
        this.varReferido.es_egresado = false;
      }
      this.varReferido.correo = this.Correo.value;
      this.varReferido.telefono_movil = this.Celular.value;

      this.referidos.push(this.varReferido);

      this.tituloInfo="Solicitud exitosa";
      this.mensajeInfo="Contacto agregado de manera exitosa.";
    }
    this.mensaje();
  }
  mensaje(){
    this.dialog.open(InfoDialogComponent,{data : {varTitulo: this.tituloInfo, varMensaje: this.mensajeInfo}});
  }
}