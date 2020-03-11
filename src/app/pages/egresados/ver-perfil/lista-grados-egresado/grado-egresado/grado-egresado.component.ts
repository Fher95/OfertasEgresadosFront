import { Component, OnInit, Inject } from '@angular/core';
import { GradoModel } from 'src/app/shared/modelos/grado.model';
import { Observable, throwError } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { GradoService } from 'src/app/shared/servicios/egresados/grado.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-grado-egresado',
  templateUrl: './grado-egresado.component.html',
  styleUrls: ['./grado-egresado.component.css']
})
export class GradoEgresadoComponent implements OnInit {
  grado: GradoModel;
  gradoObservable$: Observable<GradoModel>;
  isLoading = false;
  idGrado: number;

  constructor(
    private dialogRef: MatDialogRef<GradoEgresadoComponent>,
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
