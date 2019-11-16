import { Component, OnInit } from '@angular/core';
import { IEgresado } from 'src/app/shared/modelos/egresadoInterface';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';

@Component({
  selector: 'app-ver-postulados',
  templateUrl: './ver-postulados.component.html',
  styleUrls: ['./ver-postulados.component.css']
})
export class VerPostuladosComponent implements OnInit {
  id: string;
  listaPostulados: IEgresado[];
  listaPostuladosEscogidos: IEgresado[];
  postuladoSeleccionado: IEgresado;

  constructor(
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.listaPostulados = [];
    this.listaPostuladosEscogidos = [];
    this.cargarPostulados();
  }
  cargarPostulados() {
    this.empresaService.getPostuladosOferta(this.id).subscribe(resultado => {
      console.log(resultado);
      this.listaPostulados = resultado;
    },
      error => {
        console.log('Error al obtener el listado de postulados: ', JSON.stringify(error));
      });
  }
  cargarPostuladosSeleccionados() {
    this.empresaService.getPostuladosSeleccionadosOferta(this.id).subscribe(resultado => {
      console.log(resultado);
      this.listaPostuladosEscogidos = resultado;
    },
      error => {
        console.log('Error al obtener el listado de postulados seleccionados: ', JSON.stringify(error));
      });
  }

  seleccionarPostulado(postulado: IEgresado) {
    // Busca la posicion postulado en la lista de postulados para poder eliinarlo despues
    const posicionPostulados = this.listaPostulados.indexOf(postulado);
    // Si logra insertar en la lista de escogidos
    if (this.listaPostuladosEscogidos.push(postulado)) {
      // Elimina el postulado
      this.listaPostulados.splice(posicionPostulados, 1);
    }
  }

  desseleccionarPostulado(postulado: IEgresado) {
    // Se busca la posicion del postulado en la lista de seleccionados
    const posicionEscogidos = this.listaPostulados.indexOf(postulado);
    // Si logra insertar en la lista de escogidos
    if (this.listaPostulados.push(postulado)) {
      // Elimina el postulado
      this.listaPostuladosEscogidos.splice(posicionEscogidos, 1);
    }
  }

  setPostuladoActual(parPostulado: IEgresado) {
    this.postuladoSeleccionado  = parPostulado;
    if (this.postuladoSeleccionado !== undefined || this.postuladoSeleccionado !== null){   
      const fechaActual = new Date();
      const strFecha = fechaActual.getFullYear() + '-' + fechaActual.getMonth() + '-' + fechaActual.getDay()
      + ' ' + fechaActual.getHours() + ':' + fechaActual.getMinutes(); 
      this.empresaService.guardarRegistroVisualizacionPostulado(this.postuladoSeleccionado.identificacion, strFecha)
      .subscribe();
    }
  }
  
  reiniciarSeleccion() {
    this.postuladoSeleccionado = undefined;
  }
}
