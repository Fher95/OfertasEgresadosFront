import { Component, OnInit, Input } from '@angular/core';
import { GradoModel } from 'src/app/shared/modelos/grado.model';
import { EgresadoSharedService } from 'src/app/pages/administrador/egresados/perfil-egresado/egresado.shared.service';
import { GradoService } from 'src/app/shared/servicios/egresados/grado.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GradoEgresadoComponent } from './grado-egresado/grado-egresado.component';

@Component({
  selector: 'app-lista-grados-egresado',
  templateUrl: './lista-grados-egresado.component.html',
  styleUrls: ['./lista-grados-egresado.component.css']
})
export class ListaGradosEgresadoComponent implements OnInit {
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

    const dialogRef = this.dialog.open(GradoEgresadoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
