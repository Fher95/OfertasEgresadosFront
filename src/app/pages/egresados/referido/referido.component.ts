import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProgramaComponent } from '../programa/programa.component';

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
  
  constructor() {
    
   }

  ngOnInit() {
  }

}
