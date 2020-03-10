import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, Form, FormBuilder } from '@angular/forms';
import { Comentario } from 'src/app/shared/modelos/comentario';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';
import { ObservacionComentario } from 'src/app/shared/modelos/observacionComentario';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  /*formularioComentario : FormGroup;
  preguntas = new Array<ObservacionComentario>();
  respuestas = new Array<Comentario>();
  validarComentarios : boolean = true; 
  cantidad:number = 0;
  */
  EstudiarUnicauca = new FormControl('',Validators.required);
  Carrera = new FormControl('',Validators.required);
  Razon = new FormControl('',Validators.required);
  ComentarioPrograma = new FormControl('',Validators.required);
  DocenteInfluencia = new FormControl('',Validators.required);
  ComentarioFuturoEgresado = new FormControl('',Validators.required);

  varBoton : boolean = false;

  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  respuestas = new Array<Comentario>();
  
  @Output()
  comentarios: EventEmitter<any> = new EventEmitter<any>();


  constructor(private formBuilder : FormBuilder,private servicioCompletar: RegistroService,private alert: AlertService) {
    //this.formularioComentario = this.formBuilder.group({});
  }

  ngOnInit() {
    /*this.servicioCompletar.cuestionarioComentario().subscribe(
      data => {
        this.preguntas = data;  
        this.formularioComentario = this.toFormGroup(this.preguntas);
      }
    );*/
  }  
  /*
  toFormGroup(preguntasCuestionario : Array<ObservacionComentario>){
    var group : any = {};
    preguntasCuestionario.forEach(element => {
      group[element.id_aut_comentario] = new FormControl('',Validators.required);
    });
    return new FormGroup(group);
  }
  obtenerValorPregunta(posicion : number){
    return this.formularioComentario.get(posicion.toString()).value.toLowerCase();
  }
  onSubmit(){
    if(this.validarCampos()){
      this.preguntas.forEach(element =>{
        var varComentario = new Comentario;
        varComentario.id_aut_comentario = element.id_aut_comentario;
        var respuesta = this.formularioComentario.get(element.id_aut_comentario.toString()).value
        if(respuesta == '' && element.pregunta_padre != null){
          varComentario.respuesta = 'N/A';
        }
        else{
          varComentario.respuesta = respuesta;
        }
        this.respuestas.push(varComentario);
      });
      this.validarComentarios = false;
      this.comentarios.emit(this.respuestas);
    }
    else{
      this.alert.showErrorMessage('','Por favor llenar todos los datos.');
    }
  }
  validarCampos(){
    var bandera : boolean = false;
    var cantidad = 0;
    this.preguntas.forEach(element =>{
      var respuesta = this.formularioComentario.get(element.id_aut_comentario.toString()).value;
      if(respuesta != ''){
        cantidad++;
      }
    });
    var totalPreguntas = this.preguntas.length - this.cantidadPreguntasDependientes();  
    if(cantidad >= totalPreguntas){
      bandera = true;
    }
    return bandera;
  }
  cantidadPreguntasDependientes(){
    var cantidad = 0;
    this.preguntas.forEach(element =>{
      if(element.pregunta_padre != null){
        cantidad++;
      }
    });
    return cantidad;
  }*/
  limpiarFormulario(){
    this.EstudiarUnicauca = new FormControl('',Validators.required);
    this.Carrera = new FormControl('',Validators.required);
    this.Razon = new FormControl('',Validators.required);
    this.ComentarioPrograma = new FormControl('',Validators.required);
    this.DocenteInfluencia = new FormControl('',Validators.required);
    this.ComentarioFuturoEgresado = new FormControl('',Validators.required);
  }
  validarCampos(){
    var bandera:boolean=false;
    if(this.validarVacio() && this.validarInvalido()){
      bandera=true;
    }
    return bandera;
  }
  validarVacio(){
    var bandera:boolean = false;
    if(this.EstudiarUnicauca.value !='' && (this.Carrera.value !='' || this.Razon.value !='') && 
        this.ComentarioPrograma.value !='' && this.DocenteInfluencia.value !='' && this.ComentarioFuturoEgresado.value !=''){
          bandera=true;
        }
    return bandera;
  }
  validarInvalido(){
    var bandera:boolean = false;
    if(this.EstudiarUnicauca.status =='VALID' && (this.Carrera.status =='VALID' || this.Razon.status =='VALID') && 
        this.ComentarioPrograma.status =='VALID' && this.DocenteInfluencia.status =='VALID' && this.ComentarioFuturoEgresado.status =='VALID'){
          bandera=true;
        }
    return bandera;
  }
  enviarComentario(){
    if(this.EstudiarUnicauca.value==0){
      this.respuestas.push(this.agregarComentario(1,'Si'));
      this.respuestas.push(this.agregarComentario(2,this.Carrera.value));
    }
    else if(this.EstudiarUnicauca.value==1){
      this.respuestas.push(this.agregarComentario(1,'No'));
      this.respuestas.push(this.agregarComentario(3,this.Razon.value));
    }
    this.respuestas.push(this.agregarComentario(4,this.ComentarioPrograma.value));
    this.respuestas.push(this.agregarComentario(5,this.DocenteInfluencia.value));
    this.respuestas.push(this.agregarComentario(6,this.ComentarioFuturoEgresado.value));
      
    return this.respuestas;
  }
  agregarComentario(id : number, resp : string){
    var varComentario = new Comentario;
    varComentario.id_aut_comentario = id;
    varComentario.respuesta = resp;
    return varComentario;
  }
  deshabilitarCampos(){
    this.EstudiarUnicauca = new FormControl({value: this.EstudiarUnicauca.value, disabled : true});
    this.Carrera = new FormControl({value: this.Carrera.value, disabled : true});
    this.Razon = new FormControl({value: this.Razon.value, disabled : true});
    this.ComentarioPrograma = new FormControl({value: this.ComentarioPrograma.value, disabled : true});
    this.DocenteInfluencia = new FormControl({value: this.DocenteInfluencia.value, disabled : true});
    this.ComentarioFuturoEgresado = new FormControl({value: this.ComentarioFuturoEgresado.value, disabled : true});
  }
}