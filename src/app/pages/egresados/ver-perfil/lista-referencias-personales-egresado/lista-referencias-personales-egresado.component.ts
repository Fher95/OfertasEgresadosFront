import { Component, OnInit, Input } from '@angular/core';
import { ReferenciaPersonalModel } from 'src/app/shared/modelos/referencia-personal.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ReferenciaEgresadoComponent } from './referencia-egresado/referencia-egresado.component';

@Component({
  selector: 'app-lista-referencias-personales-egresado',
  templateUrl: './lista-referencias-personales-egresado.component.html',
  styleUrls: ['./lista-referencias-personales-egresado.component.css']
})
export class ListaReferenciasPersonalesEgresadoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'parentesco', 'celular', 'acciones'];

  @Input()
  referidos: ReferenciaPersonalModel[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  abrirDialogo(referido: ReferenciaPersonalModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = referido;
    dialogConfig.maxHeight = '600px';

    const dialogRef = this.dialog.open(
      ReferenciaEgresadoComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}