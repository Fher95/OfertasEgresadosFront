import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ExplaboralComponent } from '../explaboral/explaboral.component';
import { ReferidoComponent } from '../referido/referido.component';
import { MatTableDataSource } from '@angular/material';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { Router } from '@angular/router';

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
  columnas : string[] = ['Nombre','Parentesco','Celular'];
  dataSource: any;

  constructor(private servicioCompletar: RegistroService, private alert: AlertService, private router:Router) {
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
    return bandera;
  }
  enviarDatos()
  {
    if(this.verificarCampos()){
      this.llenarDatos();
      this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro).subscribe(
        respuesta => {
          this.alert.showSuccesMessage('','Se completo la información correctamente.').then(
            ()=>{ this.router.navigateByUrl('home');});
          console.log(respuesta);
        }, 
        error => {
          this.alert.showErrorMessage('Error','Ocurrió un error en completar la información.');  
        });
    }
    else{
      this.alert.showErrorMessage('Error','Complete todos los datos.');
    }
  }
  llenarTabla(){
    this.dataSource.data = this.varCompletarRegistro.referidos;  
  }
}