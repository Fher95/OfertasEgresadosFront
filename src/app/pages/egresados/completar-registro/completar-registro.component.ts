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

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css']
})
export class CompletarRegistroComponent implements OnInit {
  @ViewChild('referido') referido : ReferidoComponent;
  @ViewChild('expActual') expActual : ExplaboralComponent;
  @ViewChild('comentario') comentario : ComentariosComponent;
  @ViewChild('comentarioGradoAdic') comentarioGradoAdic : ComentariosComponent;
  @ViewChild('programaAdicional') programaAdicional : ProgramaComponent;

  varCompletarRegistro : CompletarRegistro;
  //Validaciones
  estadoCompletar:boolean;
  cantHijos:number;
  idPrograma:number;
  //Trabajos anteriores
  haTrabajado = new FormControl('', [Validators.required]);
  //Trabajo actual
  Labora_Actualmente = new FormControl('', [Validators.required]);

  //Tabla referidos
  columnas : string[] = ['nombres','parentesco','telefono_movil', 'acciones'];
  dataReferidos: MatTableDataSource<any>;
  referidos: any[] = [];

  //Tabla expActual
  columnasExpActual : string[] = ['cargo_nombre','nombre_empresa','sector', 'acciones'];
  dataExpActual: MatTableDataSource<any>;
  expActuales: any[] = [];

  comentariosRespuesta = new Array<Comentario>();

  //Grado adicional
  otroGrado = new FormControl('',Validators.required);
  mencionAdicional = new FormControl('',Validators.maxLength(50));
  comentariosRespuestaAdicional = new Array<Comentario>();

  idEgresado : number;
  deshabilitarCompletar:boolean = false;
  existeOtroGrado:boolean = false;

  constructor(private dialog:MatDialog,private servicioCompletar: RegistroService, private alert: AlertService, 
    private router:Router, private auth: AuthService) {
    this.limpiarFormulario();
   }

  ngOnInit() {
    this.servicioCompletar.idEgresado(this.auth.userEmail).subscribe(
      data => {
        this.idEgresado = data.id_aut_egresado;
        console.log(this.idEgresado);
        this.servicioCompletar.validarCompletar(this.idEgresado).subscribe(
          respuesta => { 
            this.estadoCompletar = respuesta.estado_completar;
            this.cantHijos = respuesta.num_hijos;
            this.idPrograma = respuesta.id_programa;
            console.log('respuesta2: '+this.estadoCompletar +'cant hijos: '+this.cantHijos+ 'progra:'+ this.idPrograma);
          }
        );
      }
    );
  }
  limpiarFormulario()
  {
    this.varCompletarRegistro = new CompletarRegistro();
    this.haTrabajado = new FormControl('', [Validators.required]);
    this.Labora_Actualmente = new FormControl('', [Validators.required]);
    this.comentariosRespuesta = new Array<Comentario>();
    this.otroGrado = new FormControl('',Validators.required);
    this.mencionAdicional = new FormControl('',Validators.maxLength(50));
    this.comentariosRespuestaAdicional = new Array<Comentario>();
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
        this.alert.showSuccesMessage('','Referencia agregada exitosamente a la lista.');
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
    if(this.referidos.length>2)
    {
      const index = this.referidos.indexOf(referido);
      if(index >= 0) {
        this.referidos.splice(index, 1);
        this.dataReferidos = new MatTableDataSource<any>(this.referidos);
        console.log('Referido eliminado');
      }
    }
    else{
      this.alert.showErrorMessage('Error','No se puede eliminar, debe tener mínimo dos referencias.');
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
  //Añadir labor actual
  addExpActual(experiencia: Experiencia){
    console.log(experiencia);
    if(!this.expActuales) {
      this.expActuales = [];
    }
    this.expActuales.push(experiencia);
    if(this.expActuales.length!=0){
      this.alert.showSuccesMessage('','Labor actual agregada exitosamente a la lista.');
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
  //Grado adicional 
  agregarGradoAdicional(){
    this.varCompletarRegistro.gradoAdicional.id_aut_programa = this.programaAdicional.Programa.value;
    if(this.programaAdicional.existenTitulos){
      this.varCompletarRegistro.gradoAdicional.titulo_especial = this.programaAdicional.Titulo.value;
    }
    this.varCompletarRegistro.gradoAdicional.mencion_honor = this.mencionAdicional.value;
    this.varCompletarRegistro.gradoAdicional.comentarios = this.comentarioGradoAdic.enviarComentario();
  }
  validar(){
    if(this.Labora_Actualmente.value==1 && this.expActuales.length>0){
      var mensaje : string = 'Si selecciona la opción no labora actualmente, entonces se borraran todos los trabajos agregados en la lista.\
      ¿Desea continuar?';
      this.alert.showconfirmationMessage('Cancelar',mensaje).then(
        resultado => { 
          if(resultado.value){
            this.expActuales = [];
            this.dataExpActual= new MatTableDataSource<any>([]);
          }
          else{
            this.Labora_Actualmente.setValue('0');
          }
        }
      );
    }
  }
  llenarDatos()
  {
    console.log('Llenar Datos Completar');
    this.varCompletarRegistro.referidos = this.referidos;
    if(this.Labora_Actualmente.value==0 && this.expActuales.length>0)
    {
      this.varCompletarRegistro.trabajo_actualmente = true;
      this.varCompletarRegistro.expActual = this.expActuales;
    }
    else if(this.Labora_Actualmente.value==1){
      this.varCompletarRegistro.trabajo_actualmente = false;
    }
    this.varCompletarRegistro.comentarios = this.comentario.enviarComentario();
    console.log('cantidad comentarios:'+this.varCompletarRegistro.comentarios.length);
    if(this.otroGrado.value==0){    
      this.varCompletarRegistro.otroGrado = true;
      this.agregarGradoAdicional();
    }
  }
  validarGradoAdicional(){
    var bandera:boolean=false;
    if(this.programaAdicional.Programa.value!=this.idPrograma){
      bandera=true;
    }
    return bandera;
  }
  verificarCampos()
  {
    var bandera:boolean = false;
    if(this.referidos.length!=0 && this.Labora_Actualmente.value!='' && this.otroGrado.value!='' && this.comentario.validarCampos()){
      if(this.Labora_Actualmente.value == 0 && this.expActuales.length>0 && this.otroGrado.value==0 
        && this.programaAdicional.Programa.value!='' && this.comentarioGradoAdic.validarCampos()){   
          console.log('Entro 1 '); 
          this.existeOtroGrado = true;
          bandera=true;
      }
      else if(this.Labora_Actualmente.value == 1 && this.otroGrado.value==0 
        && this.programaAdicional.Programa.value!='' && this.comentarioGradoAdic.validarCampos()){ 
          console.log('Entro 2 '); 
          this.existeOtroGrado = true;
          bandera=true;
      }
      else if(this.Labora_Actualmente.value == 1 && this.otroGrado.value==1){    
        console.log('Entro 3 '); 
        bandera=true;
      }
      else if(this.Labora_Actualmente.value == 0 && this.expActuales.length>0 && this.otroGrado.value==1){
        console.log('Entro 4 '); 
        bandera=true;
      }
      else {
        console.log('Entro error '); 
        bandera=false;
      }
    }
    return bandera;
  }
  enviarDatos()
  {
    this.deshabilitarCompletar=true;
    if(this.verificarCampos())
    {
      if(this.existeOtroGrado)
      {
        if(this.validarGradoAdicional())
        {
          this.llenarDatos();
        }
        else{
          this.alert.showErrorMessage('Error','Ya existe un grado registrado con este programa.').then(
            ()=>{ this.deshabilitarCompletar=false;});
        }
      }
      else{
        this.llenarDatos();
      }
      this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro,this.idEgresado).subscribe(
        respuesta => {
          this.alert.showSuccesMessage('','Se completo la información correctamente.').then(
            ()=>{ this.router.navigateByUrl('egresados');});
          console.log(respuesta);
        },
        error => {
          this.alert.showErrorMessage('Error','Ocurrió un error en completar la información.').then(
            ()=>{ this.deshabilitarCompletar=false;});
        }
      );
    }
    else{
      this.alert.showErrorMessage('Error','Complete todos los datos.').then(
        ()=>{ this.deshabilitarCompletar=false;});
    }
  }
}