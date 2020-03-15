import { AlertService } from './../../../../shared/servicios/common/alert.service';
import { ApoyoService } from './../../../../shared/servicios/egresados/apoyo.service';
import { ServicioModel } from './../../../../shared/modelos/servicio.model';
import { CatalogosService } from './../../../../shared/servicios/common/catalogos.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ApoyoModel } from 'src/app/shared/modelos/apoyo.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialogo-editar',
  templateUrl: './dialogo-editar.component.html',
  styleUrls: ['./dialogo-editar.component.css']
})
export class DialogoEditarComponent implements OnInit {
  apoyo: ApoyoModel;
  servicios: ServicioModel[];
  servicioSeleccionado: ServicioModel;

  estados: { nombre: string; value: boolean }[] = [
    {
      nombre: 'Activo',
      value: true
    },
    {
      nombre: 'Inactivo',
      value: false
    }
  ];

  estadoSeleccionado: boolean;

  isSaving = false;

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
    this.catalogoService
      .getServicios()
      .subscribe(servs => (this.servicios = servs));
    this.estadoSeleccionado = this.apoyo.usuario.activo;
  }

  agregarServicio() {
    if (!this.apoyo.servicios.includes(this.servicioSeleccionado)) {
      this.apoyo.servicios.push(this.servicioSeleccionado);
    }
  }

  eliminarServicio(servicio: ServicioModel) {
    if (this.apoyo.servicios.length - 1 < 1) {
      this.alertService.showInfoMessage(
        'Información',
        'No se permite menos de un servicio para un apoyo'
      );
    } else {
      const index = this.apoyo.servicios.indexOf(servicio);
      if (index >= 0) {
        this.apoyo.servicios.splice(index, 1);
      }
    }
  }

  cancelar(frm: NgForm) {
    if (frm.dirty) {
      this.alertService
        .showconfirmationMessage(
          'Confirmación',
          'Desea de cancelar la actualización del apoyo'
        )
        .then(res => {
          if (res.value) {
            this.dialogRef.close(false);
          }
        });
    } else {
      this.dialogRef.close(false);
    }
  }

  onSubmit() {
    console.log('Submiting the form ' + this.apoyo);
    this.isSaving = true;
    this.apoyo.usuario.activo = this.estadoSeleccionado;
    this.apoyoService.update(this.apoyo).subscribe(
      data => {
        this.alertService
          .showSuccesMessage('Éxito', 'Apoyo actualizado exitosamente')
          .then(() => {
            this.dialogRef.close(this.apoyo);
          });
        this.isSaving = false;
      },
      err => {
        this.alertService.showErrorMessage(
          'Error',
          'Error actualizando el apoyo'
        );
        this.isSaving = false;
      }
    );
  }

  async onStateChange() {
    if (false == this.estadoSeleccionado) {
      // Pasa a inactivo.
      this.alertService
        .showconfirmationMessageYesNoOptions(
          'Advertencia',
          'Si inactiva este apoyo, no podrá acceder al sistema de egresados ¿Desea Continuar?'
        )
        .then(res => {
          if (!res.value) {
            this.estadoSeleccionado = !this.estadoSeleccionado;
          }
        });
    } else {
      const enProceso = await this.apoyoService
        .enProceso(this.apoyo.id)
        .toPromise();
      if (enProceso) {
        this.alertService
          .showErrorMessage(
            'Error',
            'El apoyo está en proceso de actualizar correo electrónico, no se permitirá la activación hasta que sea verificado'
          )
          .then(() => {
            this.estadoSeleccionado = !this.estadoSeleccionado;
          });
      } else {
        this.alertService
          .showconfirmationMessageYesNoOptions(
            'Advertencia',
            'Si activa este apoyo, podrá acceder al sistema de egresados ¿Desea continuar?'
          )
          .then(res => {
            if (!res.value) {
              this.estadoSeleccionado = !this.estadoSeleccionado;
            }
          });
      }
    }
  }
}
