import { Component, OnInit, Input } from '@angular/core';
import { EgresadoModel } from 'src/app/shared/modelos/egresado.model';
import { GradoService } from 'src/app/shared/servicios/egresados/grado.service';
import { GradoModel } from 'src/app/shared/modelos/grado.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { UpdateDeleteDialogComponent } from './update-delete-dialog/update-delete-dialog.component';

@Component({
  selector: 'app-grado-ver-perfil',
  templateUrl: './grado-ver-perfil.component.html',
  styleUrls: ['./grado-ver-perfil.component.css']
})
export class GradoVerPerfilComponent implements OnInit {
  @Input()
  egresado: EgresadoModel;

  lstGradosEgresado: GradoModel[];
  displayedColumns: string[] = [
    'fechaGrado',
    'programa',
    'mencion',
    'estado',
    'opciones'
  ];

  constructor(public dialog: MatDialog, private gradoService: GradoService) {}

  ngOnInit() {
    this.gradoService
      .obtenerGradosEgresadoPor(this.egresado.id)
      .pipe(map(res => res.data))
      .subscribe(grados => (this.lstGradosEgresado = grados));
  }

  openDialog(action: string, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(UpdateDeleteDialogComponent, {
      width: '600px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Nuevo') {
        this.agregar(result.data);
      } else if (result.event == 'Actualizar') {
        this.actualizar(result.data);
      } else if (result.event == 'Eliminar') {
        this.eliminar(result.data);
      }
    });
  }

  agregar(data: any) {

  }

  actualizar(data: any) {

  }

  eliminar(data: any) {
    console.log('Delete');
    this.lstGradosEgresado = this.lstGradosEgresado.filter((value, key) => {
      return value.id != data.id;
    });
  }

  onEdit(idGrado: number) {
    //
    console.log('Edit');
  }
}
