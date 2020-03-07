import { Component, OnInit } from '@angular/core';

// Componentes de angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios proprios
import { EventoInterface } from '../../../shared/modelos/evento';
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { EventosService } from '../../../shared/servicios/admin/eventos.service';
import { VerEventoComponent, Data } from '../ver-evento/ver-evento.component';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { merge, of } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventImageApi = `${environment.baseUrl}image/`;

  private eventos: EventoInterface[];
  private maxDescLength: number;

  private msgInfo: String;
  private msgError: String;
  isLoadingResults: boolean;

  constructor(public dialog: MatDialog, private servicios: CatalogosService, private seviciosEvento: EventosService) {
    this.eventos = [];
    this.maxDescLength = 200;
   }

  ngOnInit() {
    this.cargarEventos();
    this.msgError = '';
  }

  cargarEventos() {
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
    .subscribe(data =>{ 
      console.log(data);  
      this.eventos = data
    });
  }

  verEvento(evento: EventoInterface) {
    var eventCloned: EventoInterface = evento;
    console.log("evento visto:"+eventCloned);
    let data: Data = { event: eventCloned };
    this.dialog.open(VerEventoComponent,{ data: data }).beforeClosed().subscribe(result => { });
  }
  
  obtenerDescripcionCorta(description) {
    var result = description;
    if (description.length > this.maxDescLength) {
      result = description.substr(0, this.maxDescLength) + " ...";
    }
    return result;
  }

}
