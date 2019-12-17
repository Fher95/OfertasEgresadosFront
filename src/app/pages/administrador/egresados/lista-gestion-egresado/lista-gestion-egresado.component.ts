import { MatPaginator } from '@angular/material';
import { NgForm } from '@angular/forms';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { EgresadoModel } from './../../../../shared/modelos/egresado.model';
import {
  EgresadoFilter,
  EgresadoService
} from './../../../../shared/servicios/admin/egresado.service';
import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { merge, of } from 'rxjs';

@Component({
  selector: 'app-lista-gestion-egresado',
  templateUrl: './lista-gestion-egresado.component.html',
  styleUrls: ['./lista-gestion-egresado.component.css']
})
export class ListaGestionEgresadoComponent implements OnInit, AfterViewInit {
  estados: string[] = ['ACTIVO LOGUEADO', 'ACTIVO NO LOGUEADO'];
  displayedColumns: string[] = [
    'identificacion',
    'nombres',
    'apellidos',
    'estado',
    'acciones'
  ];
  filter: EgresadoFilter;
  data: EgresadoModel[] = [];

  isLoadingResults = false;
  totalResults = 0;
  filterEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private egresadoService: EgresadoService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    merge(this.paginator.page, this.filterEvent)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.egresadoService.getAll(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.filter
          );
        }),
        map(response => {
          console.log(response);
          this.isLoadingResults = false;
          this.totalResults = response.meta.total;
          return response.data;
        }),
        catchError(err => {
          console.log('Error ' + err);
          this.isLoadingResults = false;
          return of([]);
        })
      )
      .subscribe(data => {
        console.log(data);
        this.data = data;
      });
  }

  filtrar(form: NgForm) {
    this.filter = new EgresadoFilter();
    this.filter.cedula = form.value.identificacion;
    this.filter.nombreCompleto = form.value.nombreCompleto;
    this.filter.programa = form.value.programa;
    this.filter.estado = form.value.estado;
    this.filter.titulo = form.value.titulo;
    this.paginator.firstPage();
    this.filterEvent.emit();
  }
}
