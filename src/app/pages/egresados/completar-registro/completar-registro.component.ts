import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ExplaboralComponent } from '../explaboral/explaboral.component';
import { ReferidoComponent } from '../referido/referido.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css']
})
export class CompletarRegistroComponent implements OnInit {

  varCompletarRegistro : CompletarRegistro;
  dialog : MatDialog;

  TieneHijos = new FormControl('', [Validators.required]);
  CantHijos = new FormControl('', [Validators.required]);
  //Referencias personales, lista
  @ViewChild('referido') referido : ReferidoComponent;
  haTrabajado = new FormControl('', [Validators.required]);
  //Experiencia
  @ViewChild('expAnterior') expAnterior : ExplaboralComponent;
  Labora_Actualmente = new FormControl('', [Validators.required]);
  //Experiencia
  @ViewChild('expActual') expActual : ExplaboralComponent;

  //Listas opciones
  cantHijos: string[] = [ "1", "2", "3", "4", "5", "Más de 5 hijos"];
  tipoContrato: string[] = ["Contrato a termino fijo","Contrato a termino indefinido","Contrato de Obra o labor",
                            "Contrato civil por prestación de servicios","Contrato de aprendizaje",
                            "Contrato ocasional de trabajo","Contrato temporal, ocasional o accidental"];
  rangoSalarial: string[] = ["Menos de $1.000.000","$1.000.001 - $2.000.000",
                            "$2.000.001 - $3.000.000","$3.000.001 - $6.000.000",
                            "$6.000.001 - $10.000.000","Más de $10.000.000"];
  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  constructor(private servicioCompletar: RegistroService) {
    this.limpiarFormulario();
   }

  ngOnInit() {
  }

  limpiarFormulario()
  {
    this.varCompletarRegistro = new CompletarRegistro();
  }

  llenarDatos()
  {
    this.varCompletarRegistro.num_hijos = this.CantHijos.value;
  }
  verificarCampos()
  {

  }
  enviarDatos()
  {
    this.llenarDatos();
    //llamar al servicio y mandar la interface
    this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro);
  }

  experiencia()
  {
    this.dialog.open(ExplaboralComponent);
  }
  contacto()
  {
    this.dialog.open(ReferidoComponent);
  }
}