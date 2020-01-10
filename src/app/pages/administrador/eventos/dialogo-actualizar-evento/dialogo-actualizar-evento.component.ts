import { AlertService } from './../../../../shared/servicios/common/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { EventoModel } from 'src/app/shared/modelos/evento.model';
import { EventosService } from 'src/app/shared/servicios/admin/eventos.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dialogo-actualizar-evento',
  templateUrl: './dialogo-actualizar-evento.component.html',
  styleUrls: ['./dialogo-actualizar-evento.component.css']
})
export class DialogoActualizarEventoComponent implements OnInit {
  evento: EventoModel;
  eventImage: File | null = null;
  showImageError = false;

  constructor(
    private dialogRef: MatDialogRef<DialogoActualizarEventoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private alertService: AlertService,
    private eventoService: EventosService
  ) {
    this.evento = data;
  }

  ngOnInit() {}

  onSave(form: NgForm) {
    if (form.valid) {
      console.log(this.evento);
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
              });
          },
          err => {
            this.alertService.showErrorMessage('Error', err.message);
          }
        );
    }
  }

  importFile(file: File) {
    this.eventImage = file;
    this.evento.imagePath = file;
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
