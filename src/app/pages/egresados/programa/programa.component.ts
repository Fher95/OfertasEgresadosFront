import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { FacultadInterface } from 'src/app/shared/modelos/facultadInterface';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { ProgramaInterface } from 'src/app/shared/modelos/programaInteface';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';
import { SedeInterface } from 'src/app/shared/modelos/sedeInterface';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  NivelAcademico = new FormControl('', [Validators.required]);
  Sede = new FormControl('', [Validators.required]);
  Facultad = new FormControl('', [Validators.required]);
  Programa = new FormControl('', [Validators.required]);
  sedes: SedeInterface[];
  facultades: FacultadInterface[];
  programas: ProgramaInterface[];
  nivelAcade: NivelesEstudioInterface[];
  
  pruebas:string[] = ['prueba1','prueba2','prueba3'];

  constructor(private catalogoService:CatalogosService) { 
    this.limpiarDatos();
  }

  ngOnInit() {
    this.obtenerNivelEstudio();
    this.obtenerSedes();
  }

  limpiarDatos(){
    this.NivelAcademico = new FormControl('', [Validators.required]);
    this.Sede = new FormControl('', [Validators.required]);
    this.Facultad = new FormControl('', [Validators.required]);
    this.Programa = new FormControl('', [Validators.required]);
  }
  verificarCampos(){
    var bandera:boolean=false;
    if(this.Programa.value!='' && this.Facultad.value!='' && this.Sede.value!='' && this.NivelAcademico.value!=''){
      bandera=true;
    }
    return bandera;
  }

  obtenerNivelEstudio(){
    this.catalogoService.getNivelEducativo().subscribe(data => this.nivelAcade = data);
  }

  obtenerSedes(){
    this.catalogoService.getSede().subscribe(data => this.sedes = data);
  }

  obtenerFacultad(){
    this.catalogoService.getFacultad().subscribe(data => this.facultades = data);
  }

  obtenerPrograma(){
    this.catalogoService.getPrograma(this.Sede.value,this.Facultad.value,this.NivelAcademico.value).subscribe(data => this.programas = data);
  }
}