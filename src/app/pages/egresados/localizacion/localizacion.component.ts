import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.component.html',
  styleUrls: ['./localizacion.component.css']
})
export class LocalizacionComponent implements OnInit {
  
  paisFormControl = new FormControl('', [
    Validators.required,
  ]);

  departamentoFormControl = new FormControl('', [
      Validators.required,
    ]);

  ciudadFormControl = new FormControl('', [
    Validators.required,
  ]);


  private paises = ['Colombia','Venezuela','Brasil','Argentina'];

  private departamentos = ['Trujillo', 'Cauca', 'Apure', 'Valle del Cauca', 'Guárico', 'Bahía', 'Para', 'Amazonas', 'Bueno Aires', 'La Pampa'];

  private ciudades = ['Popayán', 'Cali', 'Medellin', 'Rio de Janeiro', 'Ciudad de Cordoba', 'Rosario', 'Sao Pablo', 'Caracas'];

  private mensaje1 ='País ';

  private mensaje2 ='Departamento, estado o provincia ';

  private mensaje3 ='Municipio o ciudad ';


  constructor() { }

  ngOnInit() {
  }
}