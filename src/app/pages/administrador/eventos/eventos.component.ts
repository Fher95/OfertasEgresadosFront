import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material';
import { DialogoActualizarEventoComponent } from './dialogo-actualizar-evento/dialogo-actualizar-evento.component';
import { EventoModel } from 'src/app/shared/modelos/evento.model';
import { EventosSharedService } from './eventos-shared.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit, OnDestroy {
  seleccionSubscription: Subscription;

  @ViewChild("tblEventos")
  tblEventos: ListaEventosComponent;


  constructor(
    private shared: EventosSharedService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.seleccionSubscription = this.shared.seleccionEvento.subscribe(
      evento => {
        this.openDialog(evento);
      }
    );
  }

  ngOnDestroy() {
    this.seleccionSubscription.unsubscribe();
  }

  openDialog(evento: EventoModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = evento;
    dialogConfig.maxHeight = '800px';
    dialogConfig.minWidth = '800px';

    const dialogRef = this.dialog.open(
      DialogoActualizarEventoComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(response => {
      this.procesarGuardar(null);
    });
  }

  procesarGuardar(res) {
    this.tblEventos.eventoFiltrado.emit();
  }
}
