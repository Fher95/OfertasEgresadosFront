import { Component, OnInit, Input } from '@angular/core';
import { TrabajoActualEgresadoComponent } from './trabajo-actual-egresado/trabajo-actual-egresado.component';
import { ExperienciaModel } from 'src/app/shared/modelos/experiencia.model';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-lista-trabajos-actuales-egresado',
  templateUrl: './lista-trabajos-actuales-egresado.component.html',
  styleUrls: ['./lista-trabajos-actuales-egresado.component.css']
})
export class ListaTrabajosActualesEgresadoComponent implements OnInit {
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

    const dialogRef = this.dialog.open(TrabajoActualEgresadoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
