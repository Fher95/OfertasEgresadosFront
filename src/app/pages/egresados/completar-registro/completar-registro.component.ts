import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ExplaboralComponent } from '../explaboral/explaboral.component';
import { ReferidoComponent } from '../referido/referido.component';
import { MatDialog } from '@angular/material/dialog';
import { Referido } from 'src/app/shared/modelos/referido';
import { Experiencia } from 'src/app/shared/modelos/experiencia';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

export interface DialogData {
  varTitulo: string;
  varMensaje: string;
}

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
  referidos = new Array<Referido>();
  //Trabajos anteriores
  haTrabajado = new FormControl('', [Validators.required]);
  //Experiencias anteriores
  expAnteriores = new Array<Experiencia>();
  //Trabajo actual
  Labora_Actualmente = new FormControl('', [Validators.required]);
  //Experiencia
  expActuales = new Array<Experiencia>();

  //Listas opciones
  cantHijos: string[] = [ "1", "2", "3", "4", "5", "Más de 5 hijos"];
  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  tituloInfo: string;
  mensajeInfo: string;

  constructor(private dialog:MatDialog, private servicioCompletar: RegistroService) {
    this.limpiarFormulario();
   }

  ngOnInit() {
  }

  limpiarFormulario()
  {
    this.varCompletarRegistro = new CompletarRegistro();
    this.TieneHijos = new FormControl('', [Validators.required]);
    this.CantHijos = new FormControl('', [Validators.required]);
    this.referidos = new Array<Referido>();
    this.haTrabajado = new FormControl('', [Validators.required]);
    this.expAnteriores = new Array<Experiencia>();
    this.Labora_Actualmente = new FormControl('', [Validators.required]);
    this.expActuales = new Array<Experiencia>();
  }

  llenarDatos()
  {
    if(this.TieneHijos.value==true)
    {
      this.varCompletarRegistro.num_hijos = this.CantHijos.value;
    }
    this.varCompletarRegistro.referidos = this.referidos;

    this.varCompletarRegistro.referidos.forEach(element => {
      console.log('Nombre'+element.nombres+"Parentesco"+element.parentesco
      +"Egresado"+element.es_egresado+"NivelEduca"+element.id_nivel_educativo+
      "Progra"+element.id_aut_programa+"Correo"+element.correo+"Celular"+element.telefono_movil);

    });

    this.varCompletarRegistro.ha_trabajado = this.haTrabajado.value;
    if(this.haTrabajado.value==true)
    {
      this.varCompletarRegistro.exp_pasadas = this.expAnteriores;
    }
    this.varCompletarRegistro.trabajo_actualmente = this.Labora_Actualmente.value;
    if(this.Labora_Actualmente.value==true)
    {
      this.varCompletarRegistro.exp_actuales = this.expActuales;
    }
  }
  verificarCampos()
  {
    console.log("Entroooox2");
    var bandera:boolean = false;

    console.log("TienHijos"+this.TieneHijos.value+"HaTraba"+this.haTrabajado.value+"laboraA"+this.Labora_Actualmente.value);

    if(this.TieneHijos.value!='' && this.referidos!=null && this.haTrabajado.value!='' && this.Labora_Actualmente.value!='')
     {
      bandera = true;
    }
    else{
      this.tituloInfo="Información Faltante";
      this.mensajeInfo="Faltan datos por ingresar.";
    }
    return bandera;
  }
  enviarDatos()
  {
    console.log("Entroooo");
    if(this.verificarCampos())
    {
      this.llenarDatos();
      this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro);

      /*this.tituloInfo="Solicitud exitosa";
      this.mensajeInfo="Datos agregados de manera exitosa.";

      this.mensaje();*/
    }
    else{
      console.log("titulo"+this.tituloInfo+"mensaje"+this.mensajeInfo);
      this.mensaje();
    }
  }
  experienciaAnterior()
  {
    const dialogRef = this.dialog.open(ExplaboralComponent);
    dialogRef.afterClosed().subscribe(result =>{this.expAnteriores.push(result)})
  }
  experienciaActual()
  {
    const dialogRef = this.dialog.open(ExplaboralComponent);
    dialogRef.afterClosed().subscribe(result =>{this.expActuales.push(result)})
  }
  contacto()
  {
    const dialogRef = this.dialog.open(ReferidoComponent);
    dialogRef.afterClosed().subscribe(result => {this.referidos.push(result);});
  }
  mensaje(){
    this.dialog.open(InfoDialogComponent,{data : {varTitulo: this.tituloInfo, varMensaje: this.mensajeInfo}});
  }
}