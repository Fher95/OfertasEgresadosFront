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
  @ViewChild('referido') referido : ReferidoComponent;

  varCompletarRegistro : CompletarRegistro;
  //Trabajos anteriores
  haTrabajado = new FormControl('', [Validators.required]);
  //Experiencias anteriores
  experiencias = new Array<Experiencia>();
  //Trabajo actual
  Labora_Actualmente = new FormControl('', [Validators.required]);
  
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
    this.haTrabajado = new FormControl('', [Validators.required]);
    this.experiencias = new Array<Experiencia>();
    this.Labora_Actualmente = new FormControl('', [Validators.required]);
  }

  llenarDatos()
  {
    this.varCompletarRegistro.referidos = this.referido.referidos;

    if(this.haTrabajado.value==0)
    {
      this.varCompletarRegistro.ha_trabajado = true;
    }
    else if(this.haTrabajado.value==1){
      this.varCompletarRegistro.ha_trabajado = false;
    }
    
    if(this.Labora_Actualmente.value==0)
    {
      this.varCompletarRegistro.trabajo_actualmente = true;
    }
    else if(this.Labora_Actualmente.value==1){
      this.varCompletarRegistro.trabajo_actualmente = false;
    }
    this.varCompletarRegistro.experiencias = this.experiencias;
    console.log("Metodo llenar: hatrabajado: "+
      this.varCompletarRegistro.ha_trabajado+"trabajoactual: "+this.varCompletarRegistro.trabajo_actualmente);

  }
  verificarCampos()
  {
    console.log("Verificar:");
    var bandera:boolean = false;

    console.log("HaTraba: "+this.haTrabajado.value+"laboraA: "+this.Labora_Actualmente.value);

    if(this.referido.referidos.length!=0 && this.haTrabajado.value!='' && this.Labora_Actualmente.value!='')
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
    console.log("Enviar Datos");
    if(this.verificarCampos())
    {
      this.llenarDatos();
      console.log("Lleno Datos: ");
      console.log("hatrabajado "+
      this.varCompletarRegistro.ha_trabajado+"trabajoactual "+this.varCompletarRegistro.trabajo_actualmente);

      this.varCompletarRegistro.referidos.forEach(element => {
        console.log('Nombre '+element.nombres+"Parentesco "+element.parentesco
        +"Egresado "+element.es_egresado+"NivelEduca "+element.id_nivel_educativo+
        "Progra "+element.id_aut_programa+"Correo "+element.correo+"Celular "+element.telefono_movil);
  
      });
      this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro);

      this.tituloInfo="Solicitud exitosa";
      this.mensajeInfo="Datos agregados de manera exitosa.";
    }
    console.log("titulo: "+this.tituloInfo+"mensaje: "+this.mensajeInfo);
    this.mensaje();
  }
  experiencia()
  {
    const dialogRef = this.dialog.open(ExplaboralComponent);
    dialogRef.afterClosed().subscribe(result =>{this.experiencias.push(result)})
  }
  mensaje(){
    this.dialog.open(InfoDialogComponent,{data : {varTitulo: this.tituloInfo, varMensaje: this.mensajeInfo}});
  }
}