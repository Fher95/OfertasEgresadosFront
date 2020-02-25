import { AlertService } from './../../../../shared/servicios/common/alert.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { EventoModel } from 'src/app/shared/modelos/evento.model';
import { EventosService } from 'src/app/shared/servicios/admin/eventos.service';
import { map } from 'rxjs/operators';
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from 'src/app/shared/common/date-format';
import { DateMinMaxControl } from 'src/app/shared/common/date-min-max';
import { Utilities } from 'src/app/shared/servicios/egresados/utilities';

@Component({
  selector: 'app-dialogo-actualizar-evento',
  templateUrl: './dialogo-actualizar-evento.component.html',
  styleUrls: ['./dialogo-actualizar-evento.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class DialogoActualizarEventoComponent implements OnInit {
  evento: EventoModel;
  eventImage: File | null = null;
  showImageError = false;
  changeImage = false;
  isSaving = false;
  minmaxdate: DateMinMaxControl;

  constructor(
    private dialogRef: MatDialogRef<DialogoActualizarEventoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private alertService: AlertService,
    private eventoService: EventosService
  ) {
    this.evento = data;
  }

  ngOnInit() {
    this.minmaxdate = new DateMinMaxControl();
    this.minmaxdate.minDate = new Date(this.evento.fechaInicio);
    this.minmaxdate.maxDate = new Date(this.evento.fechaFin);
  }

  onSave(form: NgForm) {
    if (form.valid) {
      console.log(this.evento);
      this.evento.fechaInicio = Utilities.dateToString(this.minmaxdate.minDate);
      this.evento.fechaFin = Utilities.dateToString(this.minmaxdate.maxDate);
      this.isSaving = true;
      this.eventoService
        .update(this.evento, this.eventImage)
        .pipe(
          map(data => {
            return data;
          })
        )
        .subscribe(
          data => {
            this.alertService
              .showSuccesMessage(
                'Éxito',
                'Los datos del evento actualizaron correctamente'
              )
              .then(() => {
                this.dialogRef.close(data);
                this.isSaving = false;
              });
          },
          err => {
            this.alertService.showErrorMessage('Error', err.message);
            this.isSaving = false;
          }
        );
    }
  }

  importFile(file: File) {
    this.eventImage = file;
    this.evento.imagePath = file;
  }

  cancelar(frm: NgForm) {
    if (frm.dirty) {
      this.alertService
        .showconfirmationMessage(
          'Advertencia',
          'Desea cancelar la actualización del evento'
        )
        .then(res => {
          if (res.value) {
            this.dialogRef.close(false);
          }
        });
    } else this.dialogRef.close(false);
  }
}
