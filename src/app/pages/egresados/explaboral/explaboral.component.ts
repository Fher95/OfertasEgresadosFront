import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import { FormControl, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/shared/modelos/experiencia';
import { MatDialog } from '@angular/material';

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
  fechaInicio = new FormControl('', [Validators.required]);
  fechaFin = new FormControl('', [Validators.required]);
  minDate: Date;
  maxDate: Date;
  minDateN: Date;
  maxDateN: Date;

  rangoSalarial: string[] = ["Menos de $1.000.000","$1.000.001 - $2.000.000",
                            "$2.000.001 - $3.000.000","$3.000.001 - $6.000.000",
                            "$6.000.001 - $10.000.000","Más de $10.000.000"];
  tipoContrato: string[] = ["Contrato a termino fijo","Contrato a termino indefinido","Contrato de Obra o labor",
                            "Contrato civil por prestación de servicios","Contrato de aprendizaje",
                            "Contrato ocasional de trabajo","Contrato temporal, ocasional o accidental"];
  
  varExperiencia : Experiencia;

  constructor(private dialog:MatDialog) {
    this.limpiarDatos();
  }

  ngOnInit() {
  }

  limpiarDatos(){
    this.varExperiencia = new Experiencia();
    this.Labora_Area = new FormControl();
    this.NombreCategoria = new FormControl();
    this.NombreEmpresa = new FormControl();
    this.DirTrabajo = new FormControl();
    this.TelTrabajo = new FormControl();
    this.Cargo = new FormControl();
    this.RangoSalario = new FormControl();
    this.TipoContrato = new FormControl();
    this.Sector = new FormControl();
    this.fechaInicio = new FormControl();
    this.fechaFin = new FormControl();
    this.minDate = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() );
    this.minDateN = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDateN = new Date(new Date().getFullYear() - 14,new Date().getMonth(),new Date().getDate() );
  }
  validarDatos(){
    console.log('entro validar');
    var bandera:boolean = false;
    if(this.Labora_Area.value!=null && this.localizacionEmpresa.obtenerIdLocalizacion()!=null && this.NombreEmpresa.value!=null 
      && this.NombreCategoria.value!=null && this.DirTrabajo.value!=null && this.TelTrabajo.value!=null && this.Cargo.value!=null
      && this.RangoSalario.value!=null && this.TipoContrato.value!=null && this.Sector.value!=null && this.fechaInicio.value!=null 
      && this.fechaFin.value!=null)
     {
      bandera = true;
    }
    else{
      console.log("Llenar todos los datos");
    }
    return bandera;
  }
  experienciaLaboralDatos()
  {
    if(this.validarDatos())
    {
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
    }
  }
}