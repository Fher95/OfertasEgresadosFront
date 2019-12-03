import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ExplaboralComponent } from '../explaboral/explaboral.component';
import { ReferidoComponent } from '../referido/referido.component';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { MatTableDataSource } from '@angular/material';
import { ComentariosComponent } from '../comentarios/comentarios.component';

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
  @ViewChild('expAnterior') expAnterior : ExplaboralComponent;
  @ViewChild('expActual') expActual : ExplaboralComponent;
  @ViewChild('comentarios') comentarios : ComentariosComponent;

  varCompletarRegistro : CompletarRegistro;
  //Trabajos anteriores
  haTrabajado = new FormControl('', [Validators.required]);
  //Trabajo actual
  Labora_Actualmente = new FormControl('', [Validators.required]);

  //Tabla
  displayedColumns = ['No','Nombre','Parentesco','Celular'];
  dataSource: any;

  //Mensajes de error o exito
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
    this.Labora_Actualmente = new FormControl('', [Validators.required]);
  }

  llenarDatos()
  {
    this.varCompletarRegistro.referidos = this.referido.referidos;

    if(this.haTrabajado.value==0)
    {
      this.varCompletarRegistro.ha_trabajado = true;
      this.varCompletarRegistro.expAnterior = this.expAnterior.experiencias;
    }
    else if(this.haTrabajado.value==1){
      this.varCompletarRegistro.ha_trabajado = false;
    }
    
    if(this.Labora_Actualmente.value==0)
    {
      this.varCompletarRegistro.trabajo_actualmente = true;
      this.varCompletarRegistro.expActual = this.expActual.experiencias;
    }
    else if(this.Labora_Actualmente.value==1){
      this.varCompletarRegistro.trabajo_actualmente = false;
    }
  }
  verificarCampos()
  {
    var bandera:boolean = false;
    if(this.referido.referidos.length!=0 && this.haTrabajado.value!='' && this.Labora_Actualmente.value!='' )//&& this.comentarios.validarCampos())
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
    if(this.verificarCampos())
    {
      this.llenarDatos();
      this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro).subscribe(
        respuesta => {
          this.tituloInfo="Solicitud exitosa";
          this.mensajeInfo="Datos agregados de manera exitosa.";
          console.log(respuesta);
        }, 
        err => { console.log("Error")});
    }
    this.mensaje();
  }
  llenarTabla(){
    this.dataSource.data = this.varCompletarRegistro.referidos;  
  }
  mensaje(){
    var info : Information = { title : this.tituloInfo, message : this.mensajeInfo};
    this.dialog.open(InfoDialogComponent,{data : info});
  }
}