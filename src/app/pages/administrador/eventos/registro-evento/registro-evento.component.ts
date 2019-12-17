import { Utilities } from './../../../../shared/servicios/egresados/utilities';
import { EventoModel } from './../../../../shared/modelos/evento.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/shared/servicios/admin/eventos.service';

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrls: ['./registro-evento.component.css']
})
export class RegistroEventoComponent implements OnInit {
  eventImage: File | null = null;
  showImageError = false;
  constructor(private eventosService: EventosService) {}

  ngOnInit() {}

  importFile(file: File) {
    this.eventImage = file;
  }

  onSave(form: NgForm) {
    console.log(form.value);
    if (!this.eventImage) {
      this.showImageError = true;
      return;
    }
    if (form.valid) {
      const evento = new EventoModel();
      evento.nombre = form.value.nombre;
      evento.fechaInicio = Utilities.dateToString(form.value.fechaInicio, '-');
      evento.fechaFin = Utilities.dateToString(form.value.fechaFin, '-');
      evento.descripcion = form.value.descripcion;
      evento.lugar = form.value.lugar;
      evento.dirigidoA = form.value.dirigido;
      evento.cupos = form.value.cupos;

      // Call save api method
      this.eventosService.save(evento, this.eventImage).subscribe(
        data => {
          console.log(data);
          form.reset();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
