import { MatDialog, MatDialogConfig } from '@angular/material';
import { ExperienciaModel } from './../../../../../shared/modelos/experiencia.model';
import { Component, OnInit, Input } from '@angular/core';
import { TrabajoActualComponent } from '../trabajo-actual/trabajo-actual.component';

@Component({
  selector: 'app-lista-trabajos-actuales',
  templateUrl: './lista-trabajos-actuales.component.html',
  styleUrls: ['./lista-trabajos-actuales.component.css']
})
export class ListaTrabajosActualesComponent implements OnInit {
  displayedColumns: string[] = ['cargo', 'empresa', 'sector', 'acciones'];

  @Input()
  experiencias: ExperienciaModel[];
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  abrirDialogo(experiencia: ExperienciaModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = experiencia;
    dialogConfig.maxHeight = '600px';

    const dialogRef = this.dialog.open(TrabajoActualComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
