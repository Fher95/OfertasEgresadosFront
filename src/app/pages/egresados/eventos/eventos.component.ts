import { Component, OnInit, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';

// Componentes de angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios proprios
import { EventoInterface } from '../../../shared/modelos/evento';
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { EventosService } from '../../../shared/servicios/admin/eventos.service';
import { VerEventoComponent, Data } from '../ver-evento/ver-evento.component';
import { EventoModel } from 'src/app/shared/modelos/evento.model';
import { map, catchError, startWith, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { merge, of } from 'rxjs';
import { MatPaginator, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventImageApi = `${environment.baseUrl}image/`;

  private eventos: EventoInterface[];
  data: EventoModel[] = [];
  private maxDescLength: number;

  private msgInfo: String;
  private msgError: String;
  isLoadingResults: boolean;

  totalResults = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private eventoService: EventosService, private servicios: CatalogosService, private seviciosEvento: EventosService) {
    this.eventos = [];
    this.maxDescLength = 200;
  }

  ngOnInit() {
    //this.cargarEventos();
    this.ngAfterViewInit();
    this.msgError = '';
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.eventoService.getAll(
            this.paginator.pageIndex,
            this.paginator.pageSize
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


  /* cargarEventos() {
    this.servicios.getEventos().pipe(
      map(response => {
        console.log(response);
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
        this.eventos = data
      });
  } */

  verEvento(evento: EventoInterface) {
    var eventCloned: EventoInterface = evento;
    console.log("evento visto:" + eventCloned);
    let data: Data = { event: eventCloned };
    this.dialog.open(VerEventoComponent, { data: data }).beforeClosed().subscribe(result => { });
  }

  obtenerDescripcionCorta(description) {
    var result = description;
    if (description.length > this.maxDescLength) {
      result = description.substr(0, this.maxDescLength) + " ...";
    }
    return result;
  }

}
