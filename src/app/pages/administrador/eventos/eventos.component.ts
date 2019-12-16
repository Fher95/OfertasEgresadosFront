import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material';
import { DialogoActualizarEventoComponent } from './dialogo-actualizar-evento/dialogo-actualizar-evento.component';
import { EventoModel } from 'src/app/shared/modelos/evento.model';
import { EventosSharedService } from './eventos-shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit, OnDestroy {
  seleccionSubscription: Subscription;
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
    dialogConfig.maxHeight = '600px';

    const dialogRef = this.dialog.open(
      DialogoActualizarEventoComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(response => {
      // ...
    });
  }
}
