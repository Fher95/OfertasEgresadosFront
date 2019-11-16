import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FacultadInterface } from 'src/app/shared/modelos/facultadInterface';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { ProgramaInterface } from 'src/app/shared/modelos/programaInteface';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  nivelAcademico = new FormControl('', [Validators.required]);
  facultad = new FormControl('', [Validators.required]);
  programa = new FormControl('', [Validators.required]);

  facultades : FacultadInterface[];
  programas : ProgramaInterface[];

  constructor(private catalogoService:CatalogosService) { }

  ngOnInit() {
  }

  obtenerFacultad(){
    //this.catalogoService.getFacultad().subscribe(data => this.facultades=data);
  }
  obtenerPrograma(){
    //this.catalogoService.getPrograma(this.facultad.value).subscribe(data => this.programas=data);
  }

}