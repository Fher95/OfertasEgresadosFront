import { Utilities } from './../../../../shared/servicios/egresados/utilities';
import { EventoModel } from './../../../../shared/modelos/evento.model';
import { NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { EventosService } from 'src/app/shared/servicios/admin/eventos.service';
import { DateMinMaxControl } from 'src/app/shared/common/date-min-max';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from 'src/app/shared/common/date-format';
import { EgrFileUploadComponent } from '../egr-file-upload/egr-file-upload.component';

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrls: ['./registro-evento.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class RegistroEventoComponent implements OnInit {
  eventImage: File | null = null;
  showImageError = false;
  dateControl: DateMinMaxControl;
  cantidadCupos: number = 0;
  isSaving: boolean = false;

  @ViewChild('fileInput')
  fileInput: EgrFileUploadComponent;

  @Output()
  eventoGuardar = new EventEmitter<any>();

  constructor(
    private eventosService: EventosService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.dateControl = new DateMinMaxControl();
  }

  importFile(file: File) {
    this.eventImage = file;
  }

  onCuposChange() {
    if (this.cantidadCupos < 1) {
      this.cantidadCupos = 1;
    }
  }

  onCancelar(frm: NgForm) {
    if (frm.dirty || this.eventImage != null) {
      this.alertService
        .showconfirmationMessage(
          'Información',
          'Está seguro de cancelar el registro del evento'
        )
        .then(res => {
          if (res.value) {
            frm.reset();
            this.fileInput.cancelPress = true;
            this.fileInput.onFileChange(null);
            this.eventImage = null;
          }
        });
    } else {
      frm.reset();
    }
  }

  onSave(form: NgForm) {
    if (this.eventImage == null) {
      this.alertService.showErrorMessage(
        'Error',
        'No se puede registrar el evento, por favor agregue una imagen'
      );
    } else {
      if (form.valid) {
        this.isSaving = true;
        const evento = new EventoModel();
        evento.nombre = form.value.nombre;
        evento.fechaInicio = Utilities.dateToString(this.dateControl.minDate);
        evento.fechaFin = Utilities.dateToString(this.dateControl.maxDate);
        console.log('Fecha inicio: ' + evento.fechaInicio);
        console.log('Fecha fin: ' + evento.fechaFin);
        evento.descripcion = form.value.descripcion;
        evento.lugar = form.value.lugar;
        evento.horaInicio = form.value.horaInicio;
        evento.horaFin = form.value.horaFin;
        evento.dirigidoA = form.value.dirigido;
        evento.cupos = form.value.cupos;

        // Call save api method
        this.eventosService.save(evento, this.eventImage).subscribe(
          data => {
            this.alertService
              .showSuccesMessage(
                'Éxito',
                'El evento se ha registrado satisfactoriamente'
              )
              .then(() => {
                form.reset();
                this.eventoGuardar.emit();
                this.isSaving = false;
                this.fileInput.cancelPress = true;
                this.fileInput.onFileChange(null);
              });
          },
          err => {
            this.alertService.showErrorMessage(
              'Error',
              'No se puedo registrar el evento'
            );
            this.isSaving = false;
          }
        );
      }
    }
  }
}
