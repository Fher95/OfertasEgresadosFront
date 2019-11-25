import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FacultadInterface } from 'src/app/shared/modelos/facultadInterface';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { ProgramaInterface } from 'src/app/shared/modelos/programaInteface';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';
import { SedeInterface } from 'src/app/shared/modelos/sedeInterface';

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

  }

  ngOnInit() {
    this.obtenerNivelAcademico();
    this.obtenerSedes();
  }

  obtenerNivelEstudio(){
    this.catalogoService.getNivelEducativo().subscribe(data => this.nivelAcade = data);
  }

  obtenerNivelAcademico(){
    this.catalogoService.getNivelAcademico().subscribe(data => this.nivelAcade = data);
  }

  obtenerSedes(){
    this.catalogoService.getSede().subscribe(data => this.sedes = data);
  }

  obtenerFacultad(){
    this.catalogoService.getFacultad(this.Sede.value).subscribe(data => this.facultades = data);
  }

  obtenerPrograma(){
    this.catalogoService.getPrograma(this.Facultad.value,this.Sede.value,this.NivelAcademico.value).subscribe(data => this.programas = data);
  }
}