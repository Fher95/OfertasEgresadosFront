import { Component, OnInit } from '@angular/core';
import { IEgresado } from 'src/app/shared/modelos/egresadoInterface';

@Component({
  selector: 'app-ver-postulados',
  templateUrl: './ver-postulados.component.html',
  styleUrls: ['./ver-postulados.component.css']
})
export class VerPostuladosComponent implements OnInit {

  listaPostulados: IEgresado[];
  listaPostuladosEscogidos: IEgresado[];

  constructor() { }

  ngOnInit() {
    this.listaPostulados = [];
    this.listaPostuladosEscogidos = [];
  }

  seleccionarPostulado(postulado: IEgresado) {
    //Busca la posicion postulado en la lista de postulados para poder eliinarlo despues
    let posicionPostulados = this.listaPostulados.indexOf(postulado);
    //Si logra insertar en la lista de escogidos
    if(this.listaPostuladosEscogidos.push(postulado)){
      //Elimina el postulado
      this.listaPostulados.splice(posicionPostulados, 1);
    }
  }

  desseleccionarPostulado(postulado: IEgresado){
    //Se busca la posicion del postulado en la lista de seleccionados
    let posicionEscogidos = this.listaPostulados.indexOf(postulado);
    //Si logra insertar en la lista de escogidos
    if(this.listaPostulados.push(postulado)){
      //Elimina el postulado
      this.listaPostuladosEscogidos.splice(posicionEscogidos, 1);
    }
  }

}
