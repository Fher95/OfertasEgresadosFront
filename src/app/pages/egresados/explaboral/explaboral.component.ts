import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/shared/modelos/experiencia';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { CancelarDialogComponent } from '../cancelar-dialog/cancelar-dialog.component';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { Pais } from 'src/app/shared/modelos/paisInterface';
import { DepartamentoInterface } from 'src/app/shared/modelos/departamentoInterface';
import { CiudadInterface } from 'src/app/shared/modelos/ciudadesInterface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-explaboral',
  templateUrl: './explaboral.component.html',
  styleUrls: ['./explaboral.component.css']
})
export class ExplaboralComponent implements OnInit {
  @Output()
  darExperiencia: EventEmitter<any> = new EventEmitter<any>();

  Labora_Area = new FormControl('', [Validators.required]);
  Pais = new FormControl('', [Validators.required]);
  Departamento = new FormControl('', [Validators.required]);
  Ciudad = new FormControl('', [Validators.required]);
  NombreCategoria = new FormControl('', [Validators.required]);
  NombreEmpresa = new FormControl('', [Validators.required,Validators.maxLength(50)]);
  DirTrabajo = new FormControl('', [Validators.required]);
  TelTrabajo = new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(10)]);
  Cargo = new FormControl('', [Validators.required,Validators.maxLength(50)]);
  RangoSalario = new FormControl('', [Validators.required]);
  TipoContrato = new FormControl('', [Validators.required]);
  Sector = new FormControl('', [Validators.required]);
  fechaInicio = new FormControl('', [Validators.required]);

  rangoSalarial: string[] = ["Menos de $1.000.000","$1.000.001 - $2.000.000",
                            "$2.000.001 - $3.000.000","$3.000.001 - $6.000.000",
                            "$6.000.001 - $10.000.000","Más de $10.000.000"];
  tipoContrato: string[] = ["Contrato a termino fijo","Contrato a termino indefinido","Contrato de Obra o labor",
                            "Contrato civil por prestación de servicios","Contrato de aprendizaje",
                            "Contrato ocasional de trabajo","Contrato temporal, ocasional o accidental"];
  categoria: string[] = ["Empleado","Independiente","Empresario"];

  paises: Pais[];
	departamentos: DepartamentoInterface[];
  ciudades: CiudadInterface[];
  maxDate = new Date();

  varExperiencia : Experiencia;

  constructor(private dialog:MatDialog,private alert:AlertService,private catalogoService: CatalogosService) {
    this.limpiarDatos();
  }

  ngOnInit() {
    this.obtenerPais();
  }

  limpiarDatos(){
    this.varExperiencia = new Experiencia();
    this.Labora_Area = new FormControl('', [Validators.required]);
    this.Pais = new FormControl('', [Validators.required]);
    this.Departamento = new FormControl('', [Validators.required]);
    this.Ciudad = new FormControl('', [Validators.required]);
    this.NombreCategoria = new FormControl('', [Validators.required]);
    this.NombreEmpresa = new FormControl('', [Validators.required,Validators.maxLength(50)]);
    this.DirTrabajo = new FormControl('', [Validators.required]);
    this.TelTrabajo = new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(10)]);
    this.Cargo = new FormControl('', [Validators.required,Validators.maxLength(50)]);
    this.RangoSalario = new FormControl('', [Validators.required]);
    this.TipoContrato = new FormControl('', [Validators.required]);
    this.Sector = new FormControl('', [Validators.required]);
    this.fechaInicio = new FormControl('', [Validators.required]);
    this.maxDate = new Date();
  }
  validarDatos() { 
    var bandera=false;
    if(this.validarCampoVacio() && this.validarMensajeInvalido()){
      bandera=true;
    }    
    return bandera;
  }
  validarMensajeInvalido(){
    var bandera:boolean = false;
    if(this.Labora_Area.status == "VALID" && this.Pais.status== "VALID" && this.Departamento.status== "VALID" 
      && this.Ciudad.status== "VALID" && this.NombreEmpresa.status== "VALID" && this.NombreCategoria.status== "VALID"
      && this.DirTrabajo.status== "VALID" && this.TelTrabajo.status== "VALID" && this.Cargo.status== "VALID"
      && this.RangoSalario.status== "VALID" && this.TipoContrato.status== "VALID" && this.Sector.status== "VALID"
      && this.fechaInicio.status== "VALID"){
        bandera = true;
    }
    return bandera;
  }
  validarCampoVacio(){
    var bandera:boolean = false;
    if(this.Labora_Area.value!='' && this.Pais.value!='' && this.Departamento.value!='' && this.Ciudad.value!=''
      && this.NombreEmpresa.value!='' && this.NombreCategoria.value!='' && this.DirTrabajo.value!='' 
      && this.TelTrabajo.value!='' && this.Cargo.value!='' && this.RangoSalario.value!='' 
      && this.TipoContrato.value!='' && this.Sector.value!='' && this.fechaInicio.value!=''){
        bandera = true;
    }
    return bandera;
  }
  obtenerPais() {
		this.catalogoService.getPaises().subscribe(data => this.paises = data);
	}
	obtenerDepartamento() {
		this.catalogoService.getDepartamentosBy(this.Pais.value).subscribe(data => this.departamentos = data);
	}
	obtenerCiudad() {
		this.catalogoService.getCiudadesBy(this.Departamento.value).subscribe(data => this.ciudades = data);
	}
  guardarExperienciaLaboral()
  {
    if(this.validarDatos()){
      this.varExperiencia.trabajo_en_su_area = this.Labora_Area.value;
      this.varExperiencia.id_ciudad = this.Ciudad.value;
      this.varExperiencia.categoria= this.NombreCategoria.value.toUpperCase();
      this.varExperiencia.nombre_empresa = this.NombreEmpresa.value;
      this.varExperiencia.dir_empresa = this.DirTrabajo.value;
      this.varExperiencia.tel_trabajo = this.TelTrabajo.value;
      this.varExperiencia.cargo_nombre = this.Cargo.value;
      this.varExperiencia.rango_salario = this.RangoSalario.value;
      this.varExperiencia.tipo_contrato = this.TipoContrato.value;
      this.varExperiencia.sector = this.Sector.value;
      this.varExperiencia.fecha_inicio = this.fechaInicio.value;

      this.darExperiencia.emit(this.varExperiencia);
    }
    else{
      this.alert.showErrorMessage('Error','Verifique todos los datos.');
    }
  }
  cancelar(){
    this.dialog.open(CancelarDialogComponent).afterClosed().subscribe(
      resultado => {
        if(resultado==0){
          this.limpiarDatos();
        }});
  }
}