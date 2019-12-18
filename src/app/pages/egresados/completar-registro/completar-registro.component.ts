import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ExplaboralComponent } from '../explaboral/explaboral.component';
import { ReferidoComponent } from '../referido/referido.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { Router } from '@angular/router';
import { Referido } from 'src/app/shared/modelos/referido';
import { Experiencia } from 'src/app/shared/modelos/experiencia';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { ProgramaComponent } from '../programa/programa.component';
import { Comentario } from 'src/app/shared/modelos/comentario';
import { CancelarDialogComponent } from '../cancelar-dialog/cancelar-dialog.component';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css']
})
export class CompletarRegistroComponent implements OnInit {
  @ViewChild('referido') referido : ReferidoComponent;
  @ViewChild('expActual') expActual : ExplaboralComponent;
  @ViewChild('comentario') comentario : ComentariosComponent;
  @ViewChild('programaAdicional') programaAdicional : ProgramaComponent;

  varCompletarRegistro : CompletarRegistro;
  //Trabajos anteriores
  haTrabajado = new FormControl('', [Validators.required]);
  //Trabajo actual
  Labora_Actualmente = new FormControl('', [Validators.required]);

  //Tabla referidos
  columnas : string[] = ['nombres','parentesco','telefono_movil', 'acciones'];
  dataReferidos: MatTableDataSource<any>;
  referidos: any[];

  //Tabla expActual
  columnasExpActual : string[] = ['cargo_nombre','nombre_empresa','sector', 'acciones'];
  dataExpActual: MatTableDataSource<any>;
  expActuales: any[];

  //Grado adicional
  otroGrado = new FormControl('', [Validators.required]);
  tituloGradoAdicional = new FormControl('', [Validators.required]);
  mencionAdicional = new FormControl('');
  ComentProgramaAdicional = new FormControl('', [Validators.required]);
  DocenteInfluenciaAdicional = new FormControl('', [Validators.required]);

  idEgresado : number;

  constructor(private dialog:MatDialog,private servicioCompletar: RegistroService, private alert: AlertService, private router:Router, private auth: AuthService) {
    this.limpiarFormulario();
   }

  ngOnInit() {
    this.servicioCompletar.idEgresado(this.auth.userEmail).subscribe(
      data => { this.idEgresado = data.id_aut_egresado; }
      );
  }

  limpiarFormulario()
  {
    this.varCompletarRegistro = new CompletarRegistro();
    this.haTrabajado = new FormControl('', [Validators.required]);
    this.Labora_Actualmente = new FormControl('', [Validators.required]);
    this.otroGrado = new FormControl('', [Validators.required]);
    this.tituloGradoAdicional = new FormControl('', [Validators.required]);
    this.mencionAdicional = new FormControl('');
    this.ComentProgramaAdicional = new FormControl('', [Validators.required]);
    this.DocenteInfluenciaAdicional = new FormControl('', [Validators.required]);
  }
  //Añadir datos referidos
  addToList(referido: Referido) {
    var bandera:boolean=true;
    console.log(referido);
    if(!this.referidos) {
      this.referidos = [];
    }
    this.referidos.forEach(element => {
      if(element.correo==referido.correo){
        bandera=false;
      }
    });
    if(bandera){
      this.referidos.push(referido);
      if(this.referidos.length!=0){
        this.alert.showSuccesMessage('','Referencia agregada exitosamente.');
        this.referido.limpiarDatos();
      }
      this.dataReferidos = new MatTableDataSource<any>(this.referidos);
    }
    else{
      this.alert.showErrorMessage('','La referencia personal ya existe.');
    }
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
  //Añadir labor actual
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
  verificarCantReferidos(){
    var bandera:boolean = false;
    if(!this.referidos) {
      this.referidos = [];
    }
    if(this.referidos.length>=2){
      bandera=true;
    }
    return bandera;
  }
  validarSigReferido(){
    if(!this.verificarCantReferidos()){
      this.alert.showInfoMessage('','Para continuar a la siguiente sección, debe ingresar al menos dos referencias personales.');
    }
  }
  llenarDatos()
  {
    console.log('Llenar Datos Completar');
    this.varCompletarRegistro.referidos = this.referidos;

    if(this.Labora_Actualmente.value==0)
    {
      this.varCompletarRegistro.trabajo_actualmente = true;
      this.varCompletarRegistro.expActual = this.expActuales;
    }
    else if(this.Labora_Actualmente.value==1){
      this.varCompletarRegistro.trabajo_actualmente = false;
    }
    this.varCompletarRegistro.comentarios = this.comentario.guardarComentario();
    if(this.otroGrado.value==0){
      this.agregarGradoAdicional();
    }
  }
  verificarCampos()
  {
    var bandera:boolean = false;
    if(this.referidos.length!=0 && this.Labora_Actualmente.value!='' && this.comentario.validarCampos())
    {
      bandera = true;
    }
    return bandera;
  }
  enviarDatos()
  {
    if(this.verificarCampos()){
      this.llenarDatos();
      /*this.servicioCompletar.idEgresado(this.auth.userEmail).subscribe(
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
      });*/
      this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro,this.idEgresado).subscribe(
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
  agregarGradoAdicional(){
    if(this.ComentProgramaAdicional.value!='' && this.DocenteInfluenciaAdicional.value!='' 
    && this.programaAdicional.verificarCampos()){
      this.varCompletarRegistro.gradoAdicional.id_aut_programa = this.programaAdicional.Programa.value;
      //this.varCompletarRegistro.gradoAdicional.titulo_especial = this.tituloGradoAdicional.value;
      this.varCompletarRegistro.gradoAdicional.mencion_honor = this.mencionAdicional.value;
      this.varCompletarRegistro.gradoAdicional.comentarios.push(this.comentarioGradoAdicional(4,this.ComentProgramaAdicional.value));
      this.varCompletarRegistro.gradoAdicional.comentarios.push(this.comentarioGradoAdicional(5,this.DocenteInfluenciaAdicional.value));
    }
    else{
      this.alert.showErrorMessage('Error','Complete todos los datos.');
    }
  }
  comentarioGradoAdicional(idComentario : number, respuesta : string){
    var comentario = new Comentario;
    comentario.id_aut_comentario = idComentario;
    comentario.respuesta = respuesta;
    return comentario;
  }
  cancelar(){
    this.dialog.open(CancelarDialogComponent).afterClosed().subscribe(
      resultado => { 
        if(resultado==0){
          this.limpiarFormulario();
        }});
  }
}