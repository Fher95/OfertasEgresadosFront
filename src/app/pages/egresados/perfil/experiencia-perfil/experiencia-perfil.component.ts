import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { ExperienciaModel } from 'src/app/shared/modelos/experiencia.model';

@Component({
  selector: 'app-experiencia-perfil',
  templateUrl: './experiencia-perfil.component.html',
  styleUrls: ['./experiencia-perfil.component.css']
})
export class ExperienciaPerfilComponent implements OnInit {
  expLaboral : ExperienciaModel;

  constructor(@Inject(MAT_DIALOG_DATA) data,
  private dialogRef: MatDialogRef<ExperienciaModel>, private alert : AlertService, private dialog : MatDialog) { 
    this.expLaboral = data;
  }

  ngOnInit() {
  }

}
