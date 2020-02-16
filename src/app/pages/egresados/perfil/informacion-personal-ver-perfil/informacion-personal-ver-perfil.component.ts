import { Component, OnInit, Input } from '@angular/core';
import { EgresadoModel } from 'src/app/shared/modelos/egresado.model';
import { NgForm } from '@angular/forms';
import { DiscapacidadService } from 'src/app/shared/servicios/egresados/discapacidad.service';
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';
import { map } from 'rxjs/operators';
import { CiudadModel } from 'src/app/shared/modelos/ciudad.model';
import { DepartamentoModel } from 'src/app/shared/modelos/departamento.model';
import { PaisModel } from 'src/app/shared/modelos/pais.model';
import { LugarService } from 'src/app/shared/servicios/common/lugar.service';

@Component({
  selector: 'app-informacion-personal-ver-perfil',
  templateUrl: './informacion-personal-ver-perfil.component.html',
  styleUrls: ['./informacion-personal-ver-perfil.component.css']
})
export class InformacionPersonalVerPerfilComponent implements OnInit {
  @Input()
  egresado: EgresadoModel;

  onEditMode = false;
  // Lugares seleccionado
  lugarNacimiento: Lugar = {
    ciudad: this.egresado.lugarNacimiento,
    departamento: this.egresado.lugarNacimiento.departamento,
    pais: this.egresado.lugarNacimiento.departamento.pais
  }
  // Listas seleccionables
  gruposEtnicos: string[] = [
    'AFRODESCENDIENTE',
    'INDÍGENA',
    'MESTIZO',
    'BLANCO',
    'OTRO'
  ].sort();
  estadosCiviles: string[] = [
    'SOLTERO(A)', 'CASADO(A)', 'VIUDO(A)', 'UNION LIBRE',
    'SEPARADO(A)', 'COMPROMETIDO(A)', 'DIVORCIADO(A)', 'NINGUNO'
  ].sort();
  discapacidades: DiscapacidadInterface[] = [];
  discapacidadesEgresado: DiscapacidadInterface[] = [];

  lstLugarNacimiento: ListasLugares;

  constructor(private discapacidadesService: DiscapacidadService) {
    this.lstLugarNacimiento
      .inicializar(this.lugarNacimiento.pais.id,
                  this.lugarNacimiento.departamento.id);
  }

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

class Lugar {
  ciudad?: CiudadModel;
  departamento?: DepartamentoModel;
  pais?: PaisModel;
}

class ListasLugares {
  paises?: PaisModel[];
  departamentos?: DepartamentoModel[];
  ciudades?: CiudadModel[];

  constructor(private lugarService: LugarService) {
    this.cargarPaises();
  }

  inicializar(idPais: number, idDepartameto: number) {
    this.onPaisSelected(idPais);
    this.onDepartamentoSelected(idDepartameto);
  }

  cargarPaises() {
    this.lugarService.getPaises().pipe(map(res =>  res.data))
      .subscribe(paises => {
        this.paises = paises;
    });
  }

  onPaisSelected(idPais: number) {
    this.lugarService.getDepartamento(idPais).pipe(map(res => res.data))
      .subscribe(data => {
        this.departamentos = data;
        this.ciudades = null;
      });
  }

  onDepartamentoSelected(idDepartamento: number) {
    this.lugarService.getCiudades(idDepartamento).pipe(map(res => res.data))
      .subscribe(data => {
        this.ciudades = data;
      });
  }
}
