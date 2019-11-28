import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ExplaboralComponent } from '../explaboral/explaboral.component';
import { ReferidoComponent } from '../referido/referido.component';
import { MatDialog } from '@angular/material/dialog';
import { Referido } from 'src/app/shared/modelos/referido';
import { Experiencia } from 'src/app/shared/modelos/experiencia';

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
    if(this.TieneHijos.value==1)
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
    if(this.haTrabajado.value==1)
    {
      this.varCompletarRegistro.exp_pasadas = this.expAnteriores;
    }
    this.varCompletarRegistro.trabajo_actualmente = this.Labora_Actualmente.value;
    if(this.Labora_Actualmente.value==1)
    {
      this.varCompletarRegistro.exp_actuales = this.expActuales;
    }
  }
  verificarCampos()
  {
    var bandera:boolean = false;
    if(this.TieneHijos.value!=null && this.referidos!=null && this.haTrabajado.value!=null && this.Labora_Actualmente.value!=null)
     {
      bandera = true;
    }
    else{
      console.log("Llenar todos los datos");
    }
    return bandera;
  }
  enviarDatos()
  {
    if(this.verificarCampos)
    {
      this.llenarDatos();
      this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro);
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
}