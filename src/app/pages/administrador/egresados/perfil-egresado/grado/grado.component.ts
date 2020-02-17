import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertService } from './../../../../../shared/servicios/common/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradoModel } from './../../../../../shared/modelos/grado.model';
import { Component, OnInit, Inject } from '@angular/core';
import { GradoService } from 'src/app/shared/servicios/egresados/grado.service';
import { throws } from 'assert';
import { HttpErrorResponse } from '@angular/common/http';
import { ObservacionModel } from 'src/app/shared/modelos/observacion.model';
import { ObservacionService } from 'src/app/shared/servicios/admin/observacion.service';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {
  grado: GradoModel;
  private gradoObservable$: Observable<GradoModel>;

  idGrado: number;

  constructor(
    private dialogRef: MatDialogRef<GradoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private alertService: AlertService,
    private gradoService: GradoService
  ) {
    this.idGrado = data;
  }

  ngOnInit() {
    this.gradoObservable$ = this.gradoService.obtenerPorId(this.idGrado).pipe(
      map(response => {
        return response.data;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err.status);
        return throwError('Error al cargar el grado con id: ' + this.idGrado);
      })
    );
  }

  cerrar() {
    this.dialogRef.close();
  }
}
