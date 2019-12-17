import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EgresadoModel } from './../../../../../shared/modelos/egresado.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { EgresadoSharedService } from '../egresado.shared.service';
import { GradoModel } from 'src/app/shared/modelos/grado.model';
import { GradoService } from 'src/app/shared/servicios/egresados/grado.service';

@Component({
  selector: 'app-lista-grados',
  templateUrl: './lista-grados.component.html',
  styleUrls: ['./lista-grados.component.css']
})
export class ListaGradosComponent implements OnInit {
  displayedColumns: string[] = [
    'programa',
    'fechaGrado',
    'mencion',
    'estado',
    'acciones'
  ];

  @Input()
  grados: GradoModel[];

  isLoadingResults = false;

  constructor(
    private sharedData: EgresadoSharedService,
    private gradoService: GradoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('Grados:');
    console.log(this.grados);
  }
}
