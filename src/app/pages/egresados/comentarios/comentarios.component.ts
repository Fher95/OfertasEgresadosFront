import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  
  //Formulario comentarios
  comentarios = new FormGroup(
    {
      EstudiarUnicauca : new FormControl('', [Validators.required]),
      Carrera : new FormControl('', [Validators.required]),
      Razon : new FormControl('', [Validators.required]),
      ComentarioPrograma : new FormControl('', [Validators.required,Validators.maxLength(100)]),
      ComentarioFuturoEgresado : new FormControl('', [Validators.required,Validators.maxLength(100)]),
      DocenteInfluencia : new FormControl('', [Validators.required])
    }
  );


  constructor() { }

  ngOnInit() {
  }

}
