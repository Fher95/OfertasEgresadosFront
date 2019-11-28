import { MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-egresados',
  templateUrl: './lista-egresados.component.html',
  styleUrls: ['./lista-egresados.component.css']
})
export class ListaEgresadosComponent implements OnInit {

  dataSource: any[] = [
    {
      nombres: 'Sebastian', apellidos: 'Carabali', identificacion: 1061748961,
      fecha_grado: '06/06/2020', programa: 'Ingeniería de Sistemas', mencion: 'No',
      genero: 'Hombre'
    }
  ];
  columnas: string[] = ['nombres', 'apellidos', 'identificacion', 'fecha_grado', 'programa', 'mencion', 'genero'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

}
