import { AlertService } from './../../../../shared/servicios/common/alert.service';
import { ApoyoService } from './../../../../shared/servicios/egresados/apoyo.service';
import { ServicioModel } from './../../../../shared/modelos/servicio.model';
import { CatalogosService } from './../../../../shared/servicios/common/catalogos.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ApoyoModel } from 'src/app/shared/modelos/apoyo.model';

@Component({
  selector: 'app-dialogo-editar',
  templateUrl: './dialogo-editar.component.html',
  styleUrls: ['./dialogo-editar.component.css']
})
export class DialogoEditarComponent implements OnInit {

  apoyo: ApoyoModel;
  servicios: ServicioModel[];
  servicioSeleccionado: ServicioModel;

  constructor(
    private dialogRef: MatDialogRef<DialogoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private catalogoService: CatalogosService,
    private apoyoService: ApoyoService,
    private alertService: AlertService
  ) {
    this.apoyo = data;
  }

  ngOnInit() {
    this.catalogoService.getServicios().subscribe(servs => this.servicios = servs);
  }

  agregarServicio() {
    if (!this.apoyo.servicios.includes(this.servicioSeleccionado)) {
      this.apoyo.servicios.push(this.servicioSeleccionado);
    }
  }

  eliminarServicio(servicio: ServicioModel) {
    const index = this.apoyo.servicios.indexOf(servicio);
    if (index >= 0) {
      this.apoyo.servicios.splice(index, 1);
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    console.log('Submiting the form ' + this.apoyo);
    this.apoyoService.update(this.apoyo).subscribe(data => {
      this.alertService.showSuccesMessage('Éxito', 'Apoyo actualizado exitosamente')
        .then(() => { this.dialogRef.close(true); });
    }, err => {
      this.alertService.showErrorMessage('Error', 'Error actualizando el apoyo');
    });
  }
}
