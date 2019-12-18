import { ExperienciaModel } from './../../../../../shared/modelos/experiencia.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-trabajos-actuales',
  templateUrl: './lista-trabajos-actuales.component.html',
  styleUrls: ['./lista-trabajos-actuales.component.css']
})
export class ListaTrabajosActualesComponent implements OnInit {
  displayedColumns: string[] = ['cargo', 'empresa', 'sector', 'acciones'];

  @Input()
  experiencias: ExperienciaModel[];
  constructor() {}

  ngOnInit() {}
}
