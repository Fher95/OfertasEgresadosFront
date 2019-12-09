import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'fechaInicio', 'fechaFin', 'opciones'];
  data: any[];

  isLoadingResults = false;
  totalResults = 0;

  constructor() { }

  ngOnInit() {
  }

}
