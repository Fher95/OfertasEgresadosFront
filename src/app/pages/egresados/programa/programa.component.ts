import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { FacultadInterface } from 'src/app/shared/modelos/facultadInterface';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { ProgramaInterface } from 'src/app/shared/modelos/programaInteface';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';
import { SedeInterface } from 'src/app/shared/modelos/sedeInterface';
import { ErrorStateMatcher } from '@angular/material';
import { TituloInterface } from 'src/app/shared/modelos/tituloInterface.';
import { map } from 'rxjs/operators';

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
  Titulo = new FormControl('',[Validators.required]);
  sedes: SedeInterface[];
  facultades: FacultadInterface[];
  programas: ProgramaInterface[];
  nivelAcade: NivelesEstudioInterface[];
  titulos: TituloInterface[];
  
  constructor(private catalogoService:CatalogosService) { 
    this.limpiarDatos();
  }

  ngOnInit() {
    this.obtenerNivelEstudio();
  }

  limpiarDatos(){
    this.NivelAcademico = new FormControl('', [Validators.required]);
    this.Sede = new FormControl('', [Validators.required]);
    this.Facultad = new FormControl('', [Validators.required]);
    this.Programa = new FormControl('', [Validators.required]);
    this.Titulo = new FormControl('',[Validators.required]);
    this.sedes = new Array<SedeInterface>();
    this.facultades = new Array<FacultadInterface>();
    this.programas = new Array<ProgramaInterface>();
    this.nivelAcade = new Array<NivelesEstudioInterface>();
    this.titulos = new Array<TituloInterface>();
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
  obtenerTitulo(){
    this.catalogoService.getTitulo(this.Programa.value).pipe(map(response => response.data)).subscribe(data => this.titulos = data);
  }
  existenTitulos(){
    var bandera:boolean=false;
    if(this.titulos.length>0){
      bandera=true;
    }
    return bandera;
  }
}