import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-explaboral',
  templateUrl: './explaboral.component.html',
  styleUrls: ['./explaboral.component.css']
})
export class ExplaboralComponent implements OnInit {

  @ViewChild('localizacionEmpresa') localizacionEmpresa : LocalizacionComponent;
  
  Labora_Area = new FormControl('', [Validators.required]);
  NombreCategoria = new FormControl('', [Validators.required]);
  NombreEmpresa = new FormControl('', [Validators.required]);
  DirTrabajo = new FormControl('', [Validators.required]);
  TelTrabajo = new FormControl('', [Validators.required]);
  Cargo = new FormControl('', [Validators.required]);
  RangoSalario = new FormControl('', [Validators.required]);
  TipoContrato = new FormControl('', [Validators.required]);
  Sector = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

}