import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProgramaComponent } from '../programa/programa.component';
import { Referido } from 'src/app/shared/modelos/referido';
import { IfStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-referido',
  templateUrl: './referido.component.html',
  styleUrls: ['./referido.component.css']
})
export class ReferidoComponent implements OnInit {
  
  @Output() respReferido = new EventEmitter();

  @ViewChild('programa') programa : ProgramaComponent;

  Nombre = new FormControl('', [Validators.required]);
  Egresado = new FormControl('', [Validators.required]);
  Correo = new FormControl('', [Validators.required,Validators.email]);
  Celular = new FormControl('', [Validators.required,Validators.minLength(13)]);
  Parentesco = new FormControl('', [Validators.required]);
  
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
    if(this.Nombre.value!=null && this.Egresado!=null && this.Correo!=null && this.Celular!=null 
      && this.Parentesco!=null && this.programa.programa!=null){
      bandera = true;
    }
    else{
      console.log("Llenar todos los datos,prueba1");
    }
    return bandera;
  }
  referidoDatos(){
    console.log('entro validar');
    if(this.validarDatos()){
      this.varReferido.nombres = this.Nombre.value;
      this.varReferido.parentesco = this.Parentesco.value;
      this.varReferido.es_egresado = this.Egresado.value
      this.varReferido.id_nivel_educativo = this.programa.nivelAcademico.value;
      this.varReferido.id_aut_programa = this.programa.programa.value;
      this.varReferido.correo = this.Correo.value;
      this.varReferido.telefono_movil = this.Celular.value;

      this.respReferido.emit(this.varReferido);
    }
    else{
      console.log("Llenar todos los datos,prueba2");
    }
  }
}