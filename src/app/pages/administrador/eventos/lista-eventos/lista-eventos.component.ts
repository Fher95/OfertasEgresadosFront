import { EventosSharedService } from './../eventos-shared.service';
import { Utilities } from './../../../../shared/servicios/egresados/utilities';
import { EventoModel } from 'src/app/shared/modelos/evento.model';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MatPaginator, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { EventosService } from 'src/app/shared/servicios/admin/eventos.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { merge, of } from 'rxjs';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date-format';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'fechaInicio',
    'fechaFin',
    'opciones'
  ];
  filter: { lugar: string; fecha: string };
  data: EventoModel[] = [];

  eventoFiltrado: EventEmitter<any> = new EventEmitter();

  isLoadingResults = false;
  totalResults = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private eventoService: EventosService,
    private shared: EventosSharedService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    merge(this.paginator.page, this.eventoFiltrado)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.eventoService.getAll(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.filter
          );
        }),
        map(response => {
          this.isLoadingResults = false;
          this.totalResults = response.meta.total;
          return response.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      )
      .subscribe(data => {
        console.log(data);
        this.data = data;
      });
  }

  toDate(str) {
    return Utilities.parseStringToDate(str, '/');
  }

  filtarEventos(form: NgForm) {
    console.log('Buscando eventos outside the if');
    if (form.value.lugar !== '' || form.value.fecha !== '') {
      console.log('Buscand eventos');
      this.filter = {
        lugar: form.value.lugar,
        fecha:
          form.value.fecha !== ''
            ? Utilities.dateToString(form.value.fecha)
            : ''
      };
    } else {
      this.filter = null;
    }

    console.log(this.filter);

    this.paginator.firstPage();
    this.eventoFiltrado.emit();
  }

  onEventoSeleccionado(evento: EventoModel) {
    this.shared.seleccionEvento.next(evento);
  }

  noData(): boolean {
    return this.data.length == 0;
  }
}
