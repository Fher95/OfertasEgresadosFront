import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Comentario } from 'src/app/shared/modelos/comentario';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  
  //Formulario comentarios
  EstudiarUnicauca = new FormControl('', [Validators.required]);
  Carrera = new FormControl('');
  Razon = new FormControl('');
  ComentarioPrograma = new FormControl('', [Validators.required,Validators.maxLength(100)]);
  ComentarioFuturoEgresado = new FormControl('', [Validators.required,Validators.maxLength(100)]);
  DocenteInfluencia = new FormControl('', [Validators.required]);

  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  varComentario : Comentario[];

  constructor() {
    this.limpiarFormulario();
  }

  ngOnInit() {
  }

  limpiarFormulario(){
    this.varComentario = new Array<Comentario>();
    this.EstudiarUnicauca = new FormControl('', [Validators.required]);
    this.Carrera = new FormControl('');
    this.Razon = new FormControl('');
    this.ComentarioPrograma = new FormControl('', [Validators.required,Validators.maxLength(100)]);
    this.ComentarioFuturoEgresado = new FormControl('', [Validators.required,Validators.maxLength(100)]);
    this.DocenteInfluencia = new FormControl('', [Validators.required]);  
  }  
  validarCampos(){
    var bandera:boolean = false;
    
    if(this.EstudiarUnicauca.value!='' && this.ComentarioPrograma.value!='' && this.ComentarioFuturoEgresado.value!='' 
    && this.DocenteInfluencia.value!=''){
      bandera = true;
    }
    return bandera; 
  }
  guardarComentario(){
    console.log('Entro a guardar');
    if(this.validarCampos()){
      if(this.EstudiarUnicauca.value == 0){
        this.varComentario.push(this.llenarComentario(0,'true'));
        this.varComentario.push(this.llenarComentario(1,this.Carrera.value));
      }
      else if (this.EstudiarUnicauca.value == 1){
        this.varComentario.push(this.llenarComentario(0,'false'));
        this.varComentario.push(this.llenarComentario(1,this.Razon.value));
      }
      this.varComentario.push(this.llenarComentario(2,this.ComentarioPrograma.value));
      this.varComentario.push(this.llenarComentario(3,this.DocenteInfluencia.value));
      this.varComentario.push(this.llenarComentario(4,this.ComentarioFuturoEgresado.value));

      this.varComentario.forEach(element => {
        console.log('Id: '+element.id_aut_comentario+' coment: '+element.respuesta);
      });
      console.log('Cant: '+this.varComentario.length);
      return this.varComentario;
    }
  }
  llenarComentario(idComentario : number, respuesta : string){
    var comentario = new Comentario;
    comentario.id_aut_comentario = idComentario;
    comentario.respuesta = respuesta;
    return comentario;
  }  
}