import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import { FormControl, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/shared/modelos/experiencia';
import { MatDialog } from '@angular/material';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

export interface DialogData {
  varTitulo: string;
  varMensaje: string;
}

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
  tituloInfo: string;
  mensajeInfo: string;

  constructor(private dialog:MatDialog) {
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
    this.fechaFin = new FormControl('', [Validators.required]);
    this.minDate = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    this.minDateN = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDateN = new Date(new Date().getFullYear() - 14,new Date().getMonth(),new Date().getDate());
  }
  validarDatos(){
    console.log('entro validar');

    var bandera:boolean = false;

    console.log("laboraArea"+this.Labora_Area.value+"NombreEmpresa"+this.NombreEmpresa.value+
      "NombreCategoria"+this.NombreCategoria.value+"DirTrabajo"+this.DirTrabajo.value+"teltrabajo"+this.TelTrabajo.value
      +"Cargo"+this.Cargo.value+"RangoSalario"+this.RangoSalario.value+"TipoContrato"+this.TipoContrato.value+
      "Sector"+this.Sector.value+"FechaInciio"+this.fechaInicio.value+"FechaFin"+this.fechaFin.value);

    if(this.Labora_Area.value!='' && this.localizacionEmpresa.obtenerIdLocalizacion()!=null && this.NombreEmpresa.value!='' 
      && this.NombreCategoria.value!='' && this.DirTrabajo.value!='' && this.TelTrabajo.value!='' && this.Cargo.value!=''
      && this.RangoSalario.value!='' && this.TipoContrato.value!='' && this.Sector.value!='' && this.fechaInicio.value!='' 
      && this.fechaFin.value!='')
    {
      bandera = true;
    }
    else{
      this.tituloInfo="Información Faltante";
      this.mensajeInfo="Faltan datos por ingresar.";
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

      this.tituloInfo="Solicitud exitosa";
      this.mensajeInfo="Contacto agregado de manera exitosa.";
    }
    this.mensaje();
  }
  mensaje(){
    this.dialog.open(InfoDialogComponent,{data : {varTitulo: this.tituloInfo, varMensaje: this.mensajeInfo}});
  }
}