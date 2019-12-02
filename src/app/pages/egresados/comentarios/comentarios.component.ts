import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  
  //Formulario comentarios
  EstudiarUnicauca = new FormControl('', [Validators.required]);
  Carrera = new FormControl('');
  Razon = new FormControl('');
  ComentarioPrograma = new FormControl('', [Validators.required,Validators.maxLength(100)]);
  ComentarioFuturoEgresado = new FormControl('', [Validators.required,Validators.maxLength(100)]);
  DocenteInfluencia = new FormControl('', [Validators.required]);

  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  tituloInfo : string;
  mensajeInfo : string;

  constructor() {
    this.limpiarFormulario();
  }

  ngOnInit() {
  }

  limpiarFormulario(){
    this.EstudiarUnicauca = new FormControl('', [Validators.required]);
    this.Carrera = new FormControl('');
    this.Razon = new FormControl('');
    this.ComentarioPrograma = new FormControl('', [Validators.required,Validators.maxLength(100)]);
    this.ComentarioFuturoEgresado = new FormControl('', [Validators.required,Validators.maxLength(100)]);
    this.DocenteInfluencia = new FormControl('', [Validators.required]);  
  }  
  validarCampos(){
    console.log('Validacion comentarios');
    
    var bandera:boolean = false;
    
    console.log('EstudiarUni '+this.EstudiarUnicauca.value+"Carrera "+this.Carrera.value+"Razon "+this.Razon.value+"ComentarioProga "
    +this.ComentarioPrograma.value+"ComenFuturo "+this.ComentarioFuturoEgresado.value+"Docente "+this.DocenteInfluencia.value);

    if(this.EstudiarUnicauca.value!='' && this.ComentarioPrograma.value!='' && this.ComentarioFuturoEgresado.value!='' 
    && this.DocenteInfluencia.value!=''){
      bandera = true;
    }
    else{
      this.tituloInfo="Información Faltante";
      this.mensajeInfo="Faltan datos por ingresar.";
    }
    return bandera; 
  }
  
}
