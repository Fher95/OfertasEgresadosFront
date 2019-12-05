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
import { Referido } from 'src/app/shared/modelos/referido';
import { Experiencia } from 'src/app/shared/modelos/experiencia';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';

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

  //Tabla referidos
  columnas : string[] = ['nombres','parentesco','telefono_movil', 'acciones'];
  dataReferidos: MatTableDataSource<any>;
  referidos: any[];
  
  //Tabla expAnterior
  columnasExpAnterior : string[] = ['cargo_nombre','nombre_empresa','sector', 'acciones'];
  dataExpAnterior: MatTableDataSource<any>;
  expAnteriores: any[];

  //Tabla expActual
  columnasExpActual : string[] = ['cargo_nombre','nombre_empresa','sector', 'acciones'];
  dataExpActual: MatTableDataSource<any>;
  expActuales: any[];

  constructor(private servicioCompletar: RegistroService, private alert: AlertService, private router:Router, private auth: AuthService) {
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

  //Añadir datos referidos
  addToList(referido: Referido) {
    console.log(referido);
    if(!this.referidos) {
      this.referidos = [];
    }
    this.referidos.push(referido);
    if(this.referidos.length!=0){
      this.alert.showSuccesMessage('','Referencia agregada exitosamente.');
      this.referido.limpiarDatos();
    }
    this.dataReferidos = new MatTableDataSource<any>(this.referidos);
  }

  eliminarReferido(referido: Referido){
    console.log('Referido a eliminar: ' + referido);
    const index = this.referidos.indexOf(referido);
    if(index >= 0) {
      this.referidos.splice(index, 1);
      this.dataReferidos = new MatTableDataSource<any>(this.referidos);
      console.log('Referido eliminado');
    }
  }

  //Añadir datos experiencia laboral Anterior
  addExpAnterior(experiencia: Experiencia){
    console.log(experiencia);
    if(!this.expAnteriores) {
      this.expAnteriores = [];
    }
    this.expAnteriores.push(experiencia);
    if(this.expAnteriores.length!=0){
      this.alert.showSuccesMessage('','Experiencia agregada exitosamente.');
      this.expAnterior.limpiarDatos();
    }
    this.dataExpAnterior = new MatTableDataSource<any>(this.expAnteriores);
  }

  eliminarExpAnterior(experiencia: Experiencia){
    console.log('Experiencia a eliminar: ' + experiencia);
    const index = this.expAnteriores.indexOf(experiencia);
    if(index >= 0) {
      this.expAnteriores.splice(index, 1);
      this.dataExpAnterior = new MatTableDataSource<any>(this.expAnteriores);
      console.log('Experiencia eliminada');
    }
  }

  //Añadir datos actual
  addExpActual(experiencia: Experiencia){
    console.log(experiencia);
    if(!this.expActuales) {
      this.expActuales = [];
    }
    this.expActuales.push(experiencia);
    if(this.expActuales.length!=0){
      this.alert.showSuccesMessage('','Labor actual agregada exitosamente.');
      this.expActual.limpiarDatos();
    }
    this.dataExpActual = new MatTableDataSource<any>(this.expActuales);
  }

  eliminarExpActual(experiencia: Experiencia){
    console.log('Labor actual a eliminar: ' + experiencia);
    const index = this.expActuales.indexOf(experiencia);
    if(index >= 0) {
      this.expActuales.splice(index, 1);
      this.dataExpActual = new MatTableDataSource<any>(this.expActuales);
      console.log('Labor actual eliminada');
    }
  }

  llenarDatos()
  {
    this.varCompletarRegistro.referidos = this.referidos;

    if(this.haTrabajado.value==0)
    {
      this.varCompletarRegistro.ha_trabajado = true;
      this.varCompletarRegistro.expAnterior = this.expAnteriores;
    }
    else if(this.haTrabajado.value==1){
      this.varCompletarRegistro.ha_trabajado = false;
    }
    
    if(this.Labora_Actualmente.value==0)
    {
      this.varCompletarRegistro.trabajo_actualmente = true;
      this.varCompletarRegistro.expActual = this.expActuales;
    }
    else if(this.Labora_Actualmente.value==1){
      this.varCompletarRegistro.trabajo_actualmente = false;
    }
  }
  verificarCampos()
  {
    var bandera:boolean = false;
    if(this.referidos.length!=0 && this.haTrabajado.value!='' && this.Labora_Actualmente.value!='' )//&& this.comentarios.validarCampos())
    {
      bandera = true;
    }
    return bandera;
  }
  enviarDatos()
  {
    if(this.verificarCampos()){
      this.llenarDatos();
      this.servicioCompletar.idEgresado(this.auth.userEmail).subscribe(
        data => {
          console.log(data);
          this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro,data.id_aut_egresado).subscribe(
            respuesta => {
              this.alert.showSuccesMessage('','Se completo la información correctamente.').then(
                ()=>{ this.router.navigateByUrl('home');});
              console.log(respuesta);
            }, 
            error => {
              this.alert.showErrorMessage('Error','Ocurrió un error en completar la información.');  
            });
      });
    }
    else{
      this.alert.showErrorMessage('Error','Complete todos los datos.');
    }
  }
}