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

  nivelAcademico = new FormControl('', [Validators.required]);
  sede = new FormControl('', [Validators.required]);
  facultad = new FormControl('', [Validators.required]);
  programa = new FormControl('', [Validators.required]);

  sedes: SedeInterface[];
  facultades: FacultadInterface[];
  programas: ProgramaInterface[];
  nivelAcade: NivelesEstudioInterface[];
  
  constructor(private catalogoService:CatalogosService) { }

  ngOnInit() {
  }

  obtenerNivelEstudio(){
    this.catalogoService.getNivelEducativo().subscribe(data => this.nivelAcade = data);
  }

  obtenerSedes(){
    this.catalogoService.getSede().subscribe(data => this.sedes = data);
  }

  obtenerFacultad(){
    this.catalogoService.getFacultad(this.sede.value).subscribe(data => this.facultades = data);
  }

  obtenerPrograma(){
    this.catalogoService.getPrograma(this.sede.value,this.facultad.value,this.nivelAcademico.value).subscribe(data => this.programas = data);
  }

}