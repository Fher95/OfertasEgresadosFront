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
  Carrera = new FormControl('', [Validators.required]);
  Razon = new FormControl('', [Validators.required]);
  ComentarioPrograma = new FormControl('', [Validators.required,Validators.maxLength(100)]);
  ComentarioFuturoEgresado = new FormControl('', [Validators.required,Validators.maxLength(100)]);
  DocenteInfluencia = new FormControl('', [Validators.required]);

  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];


  constructor() { }

  ngOnInit() {
  }

}
