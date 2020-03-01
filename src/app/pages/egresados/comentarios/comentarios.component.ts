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
  formularioComentario : FormGroup;
  preguntas = new Array<ObservacionComentario>();
  respuestas = new Array<Comentario>();
  validarComentarios : boolean = true; 
  @Output()
  comentarios: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder : FormBuilder,private servicioCompletar: RegistroService,private alert: AlertService) {
    this.formularioComentario = this.formBuilder.group({});
  }

  ngOnInit() {
    this.servicioCompletar.cuestionarioComentario().subscribe(
      data => {
        this.preguntas = data;  
        this.formularioComentario = this.toFormGroup(this.preguntas);
      }
    );
  }  
  toFormGroup(preguntasCuestionario : Array<ObservacionComentario>){
    var group : any = {};
    preguntasCuestionario.forEach(element => {
      group[element.id_aut_comentario] = new FormControl('',Validators.required);
    });
    return new FormGroup(group);
  }
  obtenerValorPregunta(posicion : number){
    return this.formularioComentario.get(posicion.toString()).value;
  }
  onSubmit(){
    if(this.validarCampos()){
      this.preguntas.forEach(element =>{
        var varComentario = new Comentario;
        varComentario.id_aut_comentario = element.id_aut_comentario;
        varComentario.respuesta = this.formularioComentario.get(element.id_aut_comentario.toString()).value;
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
  }
}