import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ExplaboralComponent } from '../explaboral/explaboral.component';
import { ReferidoComponent } from '../referido/referido.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css']
})
export class CompletarRegistroComponent implements OnInit {

  varCompletarRegistro : CompletarRegistro;
  TieneHijos = new FormControl('', [Validators.required]);
  CantHijos = new FormControl('', [Validators.required]);
  //Referencias personales, lista
  @ViewChild('referido') referido = ReferidoComponent;
  haTrabajado = new FormControl('', [Validators.required]);
  //Experiencia
  @ViewChild('expAnterior') expAnterior : ExplaboralComponent;
  Labora_Actualmente = new FormControl('', [Validators.required]);
  //Experiencia
  @ViewChild('expActual') expActual : ExplaboralComponent;

  //Listas opciones
  cantHijos: string[] = [ "1", "2", "3", "4", "5", "Más de 5 hijos"];
  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  constructor(private dialog:MatDialog, private servicioCompletar: RegistroService) {
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