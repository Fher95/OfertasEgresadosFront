import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProgramaComponent } from '../programa/programa.component';
import { Referido } from 'src/app/shared/modelos/referido';
import { IfStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

export interface mensaje {
  varTitulo: string;
  varMensaje: string;
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

  constructor(private dialog:MatDialog) {
    this.limpiarDatos();
   }

  ngOnInit() {
  }

  limpiarDatos(){
    this.varReferido = new Referido();
    this.Nombre = new FormControl();
    this.Parentesco = new FormControl();
    this.Egresado = new FormControl();
    this.Correo = new FormControl();
    this.Celular = new FormControl();
  }
  validarDatos(){
    console.log('entro validar');
    var bandera:boolean = false;
    console.log('Nombre'+this.Nombre.value+"Egresado"+this.Egresado.value+"Correo"+this.Correo.value+"Celular"+this.Celular.value+"Parentesco"+this.Parentesco.value
    +"Nivel Acade"+this.programa.NivelAcademico.value+"Sede"+this.programa.Sede.value+"Fac"+this.programa.Facultad.value+"Programa"+this.programa.Programa.value);

    if(this.Nombre.value!=null && this.Egresado.value!=null && this.Correo.value!=null && this.Celular.value!=null 
      && this.Parentesco.value!=null && this.programa.Programa.value!=null){
      bandera = true;
    }
    else{
      mensaje: {
        varTitulo : "Información incorrecta";
        varMensaje: "Faltan datos por ingresar ";
      }
    }
    return bandera;
  }
  referidoDatos(){
    console.log('entro referido');
    if(this.validarDatos()){
      this.varReferido.nombres = this.Nombre.value;
      this.varReferido.parentesco = this.Parentesco.value;
      this.varReferido.es_egresado = this.Egresado.value
      this.varReferido.id_nivel_educativo = this.programa.NivelAcademico.value;
      this.varReferido.id_aut_programa = this.programa.Programa.value;
      this.varReferido.correo = this.Correo.value;
      this.varReferido.telefono_movil = this.Celular.value;
    }
    else{
      this.dialog.open(InfoDialogComponent);
    }
  }
  
}