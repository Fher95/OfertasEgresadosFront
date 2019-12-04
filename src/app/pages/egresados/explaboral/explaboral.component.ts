import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/shared/modelos/experiencia';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { CancelarDialogComponent } from '../cancelar-dialog/cancelar-dialog.component';

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

  @ViewChild('localizacionEmpresa') localizacionEmpresa : LocalizacionComponent;
  @Output()
  darExperiencia: EventEmitter<any> = new EventEmitter<any>();
  
  Labora_Area = new FormControl('', [Validators.required]);
  NombreCategoria = new FormControl('', [Validators.required]);
  NombreEmpresa = new FormControl('', [Validators.required]);
  DirTrabajo = new FormControl('', [Validators.required]);
  TelTrabajo = new FormControl('', [Validators.required]);
  Cargo = new FormControl('', [Validators.required]);
  RangoSalario = new FormControl('', [Validators.required]);
  TipoContrato = new FormControl('', [Validators.required]);
  Sector = new FormControl('', [Validators.required]);
  fechaInicio = new FormControl('', [Validators.required]);
  fechaFin = new FormControl('');

  rangoSalarial: string[] = ["Menos de $1.000.000","$1.000.001 - $2.000.000",
                            "$2.000.001 - $3.000.000","$3.000.001 - $6.000.000",
                            "$6.000.001 - $10.000.000","Más de $10.000.000"];
  tipoContrato: string[] = ["Contrato a termino fijo","Contrato a termino indefinido","Contrato de Obra o labor",
                            "Contrato civil por prestación de servicios","Contrato de aprendizaje",
                            "Contrato ocasional de trabajo","Contrato temporal, ocasional o accidental"];
  categoria: string[] = ["Empleado","Independiente","Empresario"];
  
  varExperiencia : Experiencia;

  constructor(private dialog:MatDialog,private alert:AlertService) {
    this.limpiarDatos();
  }

  ngOnInit() {
  }

  limpiarDatos(){
    this.varExperiencia = new Experiencia();
    this.Labora_Area = new FormControl('', [Validators.required]);
    this.NombreCategoria = new FormControl('', [Validators.required]);
    this.NombreEmpresa = new FormControl('', [Validators.required]);
    this.DirTrabajo = new FormControl('', [Validators.required]);
    this.TelTrabajo = new FormControl('', [Validators.required]);
    this.Cargo = new FormControl('', [Validators.required]);
    this.RangoSalario = new FormControl('', [Validators.required]);
    this.TipoContrato = new FormControl('', [Validators.required]);
    this.Sector = new FormControl('', [Validators.required]);
    this.fechaInicio = new FormControl('', [Validators.required]);
    this.fechaFin = new FormControl('');
  }
  validarDatos(){
    var bandera:boolean = false;

    if(this.Labora_Area.value!='' && this.localizacionEmpresa.obtenerIdLocalizacion()!=null && this.NombreEmpresa.value!='' 
      && this.NombreCategoria.value!='' && this.DirTrabajo.value!='' && this.TelTrabajo.value!='' && this.Cargo.value!=''
      && this.RangoSalario.value!='' && this.TipoContrato.value!='' && this.Sector.value!='' && this.fechaInicio.value!='' 
      && this.fechaFin.value!='')
    {
      bandera = true;
    }
    return bandera;
  }
  guardarExperienciaLaboral()
  {
    if(this.validarDatos()){
      this.varExperiencia.trabajo_en_su_area = this.Labora_Area.value;
      this.varExperiencia.id_ciudad = this.localizacionEmpresa.obtenerIdLocalizacion();
      this.varExperiencia.nombre_empresa = this.NombreEmpresa.value;
      this.varExperiencia.dir_empresa = this.DirTrabajo.value;
      this.varExperiencia.tel_trabajo = this.TelTrabajo.value;
      this.varExperiencia.cargo_nombre = this.Cargo.value;
      this.varExperiencia.rango_salario = this.RangoSalario.value;
      this.varExperiencia.tipo_contrato = this.TipoContrato.value;
      this.varExperiencia.sector = this.Sector.value;
      this.varExperiencia.fecha_inicio = this.fechaInicio.value;
      this.varExperiencia.fecha_fin = this.fechaFin.value;

      this.darExperiencia.emit(this.varExperiencia);
    }
    else{
      this.alert.showErrorMessage('Error','Complete todos los datos.');
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