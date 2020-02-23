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
import { Observable } from 'rxjs';
import { UpdateInformacionPersonalModel } from 'src/app/shared/modelos/update-informacion-personal.model';
import { EgresadoService } from 'src/app/shared/servicios/admin/egresado.service';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { VerPerfilEgresado } from 'src/app/shared/modelos/verPerfilEgresado';

@Component({
  selector: 'app-informacion-personal-ver-perfil',
  templateUrl: './informacion-personal-ver-perfil.component.html',
  styleUrls: ['./informacion-personal-ver-perfil.component.css']
})
export class InformacionPersonalVerPerfilComponent implements OnInit {
  @Input()
  egresado: VerPerfilEgresado;

  onEditMode = false;
  // Lugares seleccionado
  lugarNacimiento: Lugar;
  lugarResidencia: Lugar;
  // Listas seleccionables
  gruposEtnicos: string[] = [
    'AFRODESCENDIENTE',
    'INDÍGENA',
    'MESTIZO',
    'BLANCO',
    'OTRO'
  ].sort();
  estadosCiviles: string[] = [
    'SOLTERO(A)',
    'CASADO(A)',
    'VIUDO(A)',
    'UNION LIBRE',
    'SEPARADO(A)',
    'COMPROMETIDO(A)',
    'DIVORCIADO(A)',
    'NINGUNO'
  ].sort();
  discapacidades: DiscapacidadInterface[] = [];
  discapacidadesEgresado: DiscapacidadInterface[] = [];

  lstLugarNacimiento: ListasLugares;
  lstLugarResidencia: ListasLugares;

  constructor(
    private discapacidadesService: DiscapacidadService,
    private lugarService: LugarService,
    private egresadoService: EgresadoService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this._cargarDatos();
    this.lugarNacimiento = {
      ciudad: this.egresado.lugarNacimiento,
      departamento: this.egresado.lugarNacimiento.departamento,
      pais: this.egresado.lugarNacimiento.departamento.pais
    };
    this.lstLugarNacimiento = new ListasLugares(this.lugarService);
    this.lstLugarNacimiento.inicializar(
      this.lugarNacimiento.pais.id,
      this.lugarNacimiento.departamento.id
    );
  }

  onEditar() {
    this.onEditMode = !this.onEditMode;
  }

  enDiscapacidadEgresado(idDiscapacidad: number) {
    return this.discapacidadesEgresado
      .map(dis => dis.idDiscapacidad)
      .includes(idDiscapacidad);
  }

  onCheckDiscapacidad(discapacidad: DiscapacidadInterface, checked: boolean) {
    if (checked) {
      if (discapacidad.Nombre.toLowerCase() === 'ninguna') {
        this.discapacidadesEgresado = [];
      } else {
        let index = this.discapacidadesEgresado
          .map(dis => dis.Nombre.toLowerCase())
          .indexOf('ninguna');
        console.log(index);
        if (index >= 0) {
          this.discapacidadesEgresado.splice(index, 1);
        }
      }
      this.discapacidadesEgresado.push(discapacidad);
    } else {
      this.discapacidadesEgresado.splice(
        this.discapacidadesEgresado
          .map(dis => dis.idDiscapacidad)
          .indexOf(discapacidad.idDiscapacidad),
        1
      );
    }
  }

  mostrarOtraDiscapacidad() {
    return this.discapacidadesEgresado
      .map(dis => dis.Nombre.toLowerCase())
      .includes('otra(s)');
  }

  private _cargarDatos() {
    this._cargarDiscapacidades();
    this._cargarDiscapacidadesEgresado();
    this._cargarLugarResidencia();
  }

  private _cargarLugarResidencia() {
    this.lugarResidencia = {
      ciudad: this.egresado.lugarResidencia.ciudad,
      departamento: this.egresado.lugarResidencia.ciudad.departamento,
      pais: this.egresado.lugarResidencia.ciudad.departamento.pais
    };
    this.lstLugarResidencia = new ListasLugares(this.lugarService);
    this.lstLugarResidencia.inicializar(
      this.egresado.lugarResidencia.ciudad.departamento.pais.id,
      this.egresado.lugarResidencia.ciudad.departamento.id
    );
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

  onGuardar(frm: NgForm, $event: Event) {
    $event.preventDefault();
    if (frm.valid && frm.submitted && this.discapacidadesEgresado.length > 0) {
      console.log('On save info personal egresado.');
      let infoPersonal: UpdateInformacionPersonalModel = {
        nombres: frm.controls.nombres.value,
        apellidos: frm.controls.apellidos.value,
        grupoEtnico: frm.controls.grupoEtnico.value,
        identificacion: frm.controls.identificacion.value,
        estadoCivil: frm.controls.estadoCivil.value,
        idCiudadNacimiento: frm.controls.ciudadNacimiento.value,
        idCiudadResidencia: frm.controls.ciudadResidencia.value,
        direccionResidencia: frm.controls.direccionResidencia.value,
        genero: frm.controls.genero.value,
        correo: frm.controls.correo.value,
        correoAlternativo: frm.controls.correoAlternativo.value,
        telefonoFijo: frm.controls.telefonoFijo.value,
        celular: frm.controls.celular.value,
        discapacidades: this.discapacidadesEgresado.map(
          dis => dis.idDiscapacidad
        )
      };
      this.egresadoService
        .updateInfoPersonal(infoPersonal, this.egresado.id)
        .subscribe(res => {
          this.alertService.showSuccesMessage(
            'Éxito',
            'Información personal actualizada exitosamente'
          );
        });
      this.onEditMode = false;
    }
  }

  onCancelar() {
    this.onEditMode = false;
  }
}

class Lugar {
  ciudad?: CiudadModel;
  departamento?: DepartamentoModel;
  pais?: PaisModel;
}

class ListasLugares {
  paises$?: Observable<PaisModel[]>;
  departamentos$?: DepartamentoModel[];
  ciudades$?: CiudadModel[];

  constructor(private lugarService: LugarService) {
    this.cargarPaises();
  }

  inicializar(idPais: number, idDepartameto: number) {
    this.onPaisSelected(idPais);
    this.onDepartamentoSelected(idDepartameto);
  }

  cargarPaises() {
    this.paises$ = this.lugarService.getPaises().pipe(map(res => res.data));
  }

  onPaisSelected(idPais: number) {
    console.log('IdPais: ' + idPais);
    this.lugarService
      .getDepartamento(idPais)
      .pipe(map(res => res.data))
      .subscribe(dta => {
        this.departamentos$ = dta;
        this.ciudades$ = null;
      });
  }

  onDepartamentoSelected(idDepartamento: number) {
    this.lugarService
      .getCiudades(idDepartamento)
      .pipe(map(res => res.data))
      .subscribe(dta => {
        this.ciudades$ = dta;
      });
  }
}
