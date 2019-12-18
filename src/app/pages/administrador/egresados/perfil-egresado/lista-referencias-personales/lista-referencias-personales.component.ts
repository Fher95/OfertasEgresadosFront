import { ReferenciaPersonalComponent } from './../referencia-personal/referencia-personal.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ReferenciaPersonalModel } from './../../../../../shared/modelos/referencia-personal.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-referencias-personales',
  templateUrl: './lista-referencias-personales.component.html',
  styleUrls: ['./lista-referencias-personales.component.css']
})
export class ListaReferenciasPersonalesComponent implements OnInit {
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
      ReferenciaPersonalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
