import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EgresadoModel } from './../../../../../shared/modelos/egresado.model';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { EgresadoSharedService } from '../egresado.shared.service';
import { GradoModel } from 'src/app/shared/modelos/grado.model';
import { GradoService } from 'src/app/shared/servicios/egresados/grado.service';
import { GradoComponent } from '../grado/grado.component';

@Component({
  selector: 'app-lista-grados',
  templateUrl: './lista-grados.component.html',
  styleUrls: ['./lista-grados.component.css']
})
export class ListaGradosComponent implements OnInit {
  displayedColumns: string[] = [
    'programa',
    'fechaGrado',
    'mencion',
    'estado',
    'acciones'
  ];

  @Input()
  grados: GradoModel[];

  isLoadingResults = false;

  constructor(
    private sharedData: EgresadoSharedService,
    private gradoService: GradoService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('Grados:');
    console.log(this.grados);
  }

  abrirDialogoGrado(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = id;
    dialogConfig.maxHeight = '600px';

    const dialogRef = this.dialog.open(GradoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
