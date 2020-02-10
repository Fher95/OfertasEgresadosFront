import { Component, OnInit, Input } from '@angular/core';
import { EgresadoModel } from 'src/app/shared/modelos/egresado.model';
import { NgForm } from '@angular/forms';
import { DiscapacidadService } from 'src/app/shared/servicios/egresados/discapacidad.service';
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-informacion-personal-ver-perfil',
  templateUrl: './informacion-personal-ver-perfil.component.html',
  styleUrls: ['./informacion-personal-ver-perfil.component.css']
})
export class InformacionPersonalVerPerfilComponent implements OnInit {
  @Input()
  egresado: EgresadoModel;

  onEditMode = false;

  // Listas seleccionables
  gruposEtnicos: string[] = [
    'AFRODESCENDIENTE',
    'INDÍGENA',
    'MESTIZO',
    'BLANCO',
    'OTRO'
  ];
  discapacidades: DiscapacidadInterface[] = [];
  discapacidadesEgresado: DiscapacidadInterface[] = [];

  constructor(private discapacidadesService: DiscapacidadService) {}

  ngOnInit() {
    this._cargarDatos();
  }

  private _cargarDatos() {
    this._cargarDiscapacidades();
    this._cargarDiscapacidadesEgresado();
  }

  private _cargarDiscapacidades() {
    this.discapacidadesService
      .obtenerDiscapacidades()
      .pipe(
        map(resp => {
          return resp.data;
        })
      )
      .subscribe(data => {
        this.discapacidades = data;
      });
  }

  private _cargarDiscapacidadesEgresado() {
    this.discapacidadesService
      .obtenerDiscapacidadesByEgresado(this.egresado.id)
      .pipe(
        map(res => {
          return res.data;
        })
      )
      .subscribe(data => {
        this.discapacidadesEgresado = data;
      });
  }

  onGuardar(frm: NgForm) {
    console.log('On save info personal egresado.');
    console.log(frm.value);
  }

  onCancelar() {
    console.log('Cancelando');
  }
}
