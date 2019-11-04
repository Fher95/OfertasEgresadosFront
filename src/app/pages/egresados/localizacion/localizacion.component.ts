import { Component, OnInit } from '@angular/core';



import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { Pais } from '../../../shared/modelos/paisInterface';
import { DepartamentoInterface } from '../../../shared/modelos/departamentoInterface';
import { CiudadInterface } from '../../../shared/modelos/ciudadesInterface';
import { Observable } from 'rxjs';


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


	/*private paises = ['Colombia','Venezuela','Brasil','Argentina'];
	private departamentos = ['Trujillo', 'Cauca', 'Apure', 'Valle del Cauca', 'Guárico', 'Bahía', 'Para', 'Amazonas', 'Bueno Aires', 'La Pampa'];
 	private ciudades = ['Popayán', 'Cali', 'Medellin', 'Rio de Janeiro', 'Ciudad de Cordoba', 'Rosario', 'Sao Pablo', 'Caracas'];
	*/ 
	private mensaje1 ='País ';
 	private mensaje2 ='Departamento, estado o provincia ';
	private mensaje3 ='Municipio o ciudad ';
	 
	 private paises: Pais[];
	 private departamentos: DepartamentoInterface[];
	 private ciudades: CiudadInterface[];
	 private s: string;


  constructor(private catalogoService:CatalogosService) { }

  	obtenerPais(){
		this.catalogoService.getPaises().subscribe(data => this.paises=data);
	}
	obtenerDepartamento(){
		this.catalogoService.getDepartamentosBy(this.paisFormControl.value).subscribe(data => this.departamentos=data);
	}
	obtenerCiudad(){
		this.catalogoService.getCiudadesBy(this.departamentoFormControl.value).subscribe(data => this.ciudades=data);
	}



  ngOnInit() {
	  this.obtenerPais();
  }

}


