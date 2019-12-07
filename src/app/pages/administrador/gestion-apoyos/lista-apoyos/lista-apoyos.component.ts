import { MatPaginator } from '@angular/material';
import { ApoyoService } from './../../../../shared/servicios/egresados/apoyo.service';
import { ApoyoModel } from './../../../../shared/modelos/apoyo.model';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-lista-apoyos',
  templateUrl: './lista-apoyos.component.html',
  styleUrls: ['./lista-apoyos.component.css']
})
export class ListaApoyosComponent implements AfterViewInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'nombreRol', 'activo', 'opciones'];
  data: ApoyoModel[] = [];
  @Output() seleccionarApoyo: EventEmitter<ApoyoModel> = new EventEmitter<ApoyoModel>();
  actualizarTabla: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(
    private service: ApoyoService
  ) { }

  ngAfterViewInit() {
    merge(this.paginator.page, this.actualizarTabla)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getAll(this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(response => {
          // Flip flag to show that loading has finished.
          console.log(response);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = response.meta.total;

          return response.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => {
        this.data = data;
      });
  }

  nuevoApoyo(apoyo: ApoyoModel) {
    this.data.push(apoyo);
    this.actualizarTabla.emit();
  }

  editarApoyo(apoyo: ApoyoModel) {
    const index = this.data.indexOf(apoyo);
    if (index >= 0) {
      this.data.splice(index, 1, apoyo);
    }
  }

  onApoyoSeleccionado(apoyo: ApoyoModel) {
    this.seleccionarApoyo.emit(apoyo);
  }

}
