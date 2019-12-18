import { ReferenciaPersonalModel } from './../../../../../shared/modelos/referencia-personal.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-referencias-personales',
  templateUrl: './lista-referencias-personales.component.html',
  styleUrls: ['./lista-referencias-personales.component.css']
})
export class ListaReferenciasPersonalesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'parentesco', 'celular', 'acciones'];

  @Input()
  referidos: ReferenciaPersonalModel[];

  constructor() {}

  ngOnInit() {}
}
