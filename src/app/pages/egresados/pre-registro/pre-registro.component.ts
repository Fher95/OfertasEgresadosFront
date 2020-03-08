import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl, FormGroupDirective, NgForm, Validators
} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

// Componentes y Modelos propios
import { User } from '../../../shared/modelos/user';
import { DiscapacidadInterface } from '../../../shared/modelos/discapacidadInterface';
import { SedeInterface } from '../../../shared/modelos/sedeInterface';
import { TituloInterface } from '../../../shared/modelos/tituloInterface.';
import { ProgramaInterface } from '../../../shared/modelos/programaInteface';
import { FacultadInterface } from '../../../shared/modelos/facultadInterface';
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { Utilities } from '../../../shared/servicios/egresados/utilities';
import { RegistroService } from '../../../shared/servicios/egresados/registro.service';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';
import { Pais } from '../../../shared/modelos/paisInterface';
import { DepartamentoInterface } from '../../../shared/modelos/departamentoInterface';
import { CiudadInterface } from '../../../shared/modelos/ciudadesInterface';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FiltroLugares } from 'src/app/shared/common/filtro-lugares';
import { LugarService } from 'src/app/shared/servicios/common/lugar.service';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.css']
})
export class PreRegistroComponent implements OnInit {
  @ViewChild('lugarExpedicion') lExpedicion: LocalizacionComponent;
  @ViewChild('lugarNacimiento') lNacimiento: LocalizacionComponent;
  @ViewChild('lugarResidencia') lResidencia: LocalizacionComponent;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  emailFormControl2 = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
    Validators.email
  ]);
  sedeFormControl = new FormControl('', [Validators.required]);
  programaFormControl = new FormControl('', [Validators.required]);
  facultadFormControl = new FormControl('', [Validators.required]);
  tituloFormControl = new FormControl('', [Validators.required]);
  fechaGFormControl = new FormControl('', [Validators.required]);
  fechaNFormControl = new FormControl('', [Validators.required]);
  estadoCFormControl = new FormControl('', [Validators.required]);
  grupoEFormControl = new FormControl('', [Validators.required]);
  nivelAFormControl = new FormControl('', [Validators.required]);
  anioGFormControl = new FormControl('', [Validators.required]);
  identificacionFormControl = new FormControl('', [Validators.required]);
  tipoIdentificacionFormControl = new FormControl('', [Validators.required,]);
  paisExpedicionFormControl = new FormControl('', [Validators.required,]);
  departamentoExpedicionFormControl = new FormControl('', [Validators.required,]);
  ciudadExpedicionFormControl = new FormControl('', [Validators.required,]);
  paisNacimientoFormControl = new FormControl('', [Validators.required,]);
  departamentoNacimientoFormControl = new FormControl('', [Validators.required,]);
  ciudadNacimientoFormControl = new FormControl('', [Validators.required,]);
  paisResidenciaFormControl = new FormControl('', [Validators.required,]);
  departamentoResidenciaFormControl = new FormControl('', [Validators.required,]);
  ciudadResidenciaFormControl = new FormControl('', [Validators.required,]);
  // Variable en la que se almacena los datos ingresados para el preregistro
  private user: User;

  private btnGuardar: boolean = false;
  private tamanioIdentificacio = 9;
  private patternIdentificacion: string;

  // Variables para mostrar errores de correo y identificación
  private msgErrorIdentificacion: String;
  private msgErrorcorreo: String;

  // Variables para almacenar los datos desde el back
  private sedes: SedeInterface[];
  private facultades: FacultadInterface[];
  private programas: ProgramaInterface[];
  private discapacidades: DiscapacidadInterface[];
  private discapacidadesAux: DiscapacidadInterface[];
  private niveles_academicos: NivelesEstudioInterface[];
  private titulos: TituloInterface[];
  private anios: number[] = [];
  private discapacidad: number[] = [];
  private paises: Pais[];
  private departamentosExp: DepartamentoInterface[];
  private ciudadesExp: CiudadInterface[];
  private departamentosNac: DepartamentoInterface[];
  private ciudadesNac: CiudadInterface[];
  private departamentosRes: DepartamentoInterface[];
  private ciudadesRes: CiudadInterface[];


  private pais = 'País ';
  private departamento = 'Departamento, estado o provincia ';
  private municipio = 'Municipio o ciudad ';

  private mesajeTipoID: string;

  //variables para tomar referencia al año de graduacion
  private fecha: number = new Date().getFullYear();
  private anioIni: number = 1849;

  onEditMode = false;

  private generos: string[] = ['Masculino', 'Femenino'];
  private estadosC: string[] = [
    'Soltero(a)',
    'Casado(a)',
    'Viudo(a)',
    'Unión libre',
    'Separado(a)',
    'Comprometido(a)',
    'Divorciado(a)'
  ];
  private gruposE: string[] = [
    'Ninguno',
    'Afrodescendiente',
    'Indígena',
    'Mestizo',
    'Blanco',
    'Otro'
  ];

  private tiposIdentificacion: string[] = [
    'Cédula de ciudadanía',
    'Cédula de extranjería',
    'Tarjeta de extrangería',
    'Pasaporte',
    'Documento de identificación extranjero'
  ];

  // Variable para capturar y acotar la fecha seleccionada
  private minDate: Date;
  private maxDate: Date;
  private minDateN: Date;
  private maxDateN: Date;

  //Variable para programa con titulo
  guardar: boolean = false;


  private respuestaDiscapacidad: boolean = false;

  constructor(
    private alert: AlertService,
    private dialog: MatDialog,
    private registroService: RegistroService,
    private catalogoService: CatalogosService,
    private router: Router
  ) {
    this.cleanFormData();
    this.aniosGrado();
  }

  //Método para obtener los años de grado
  aniosGrado() {
    for (let i = this.anioIni; i <= this.fecha; i++) {
      this.anios.push(i);
    }
    this.anios = this.anios.reverse();
  }

  // Método para limpiar datos de control de formulario
  private cleanFormData() {
    this.user = new User('', '', '', 0, '', '', '', '', 0, [], '', 0, 0, '', '', '', '', 0, '', '', '', '');
    this.msgErrorIdentificacion = '';
    this.titulos = [];
    this.discapacidades = [];
    this.discapacidadesAux = [];
    this.emailFormControl = new FormControl();
    this.emailFormControl2 = new FormControl();
    this.sedeFormControl = new FormControl();
    this.programaFormControl = new FormControl();
    this.facultadFormControl = new FormControl();
    this.fechaGFormControl = new FormControl();
    this.fechaNFormControl = new FormControl();
    this.tituloFormControl = new FormControl();
    this.paisExpedicionFormControl = new FormControl();
    this.departamentoExpedicionFormControl = new FormControl();
    this.ciudadExpedicionFormControl = new FormControl();
    this.paisNacimientoFormControl = new FormControl();
    this.departamentoNacimientoFormControl = new FormControl();
    this.ciudadNacimientoFormControl = new FormControl();
    this.paisResidenciaFormControl = new FormControl();
    this.departamentoResidenciaFormControl = new FormControl();
    this.ciudadResidenciaFormControl = new FormControl();
    this.grupoEFormControl = new FormControl();
    this.estadoCFormControl = new FormControl();
    this.anioGFormControl = new FormControl();
    this.nivelAFormControl = new FormControl();
    this.minDate = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    this.minDateN = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDateN = new Date(
      new Date().getFullYear() - 14,
      new Date().getMonth(),
      new Date().getDate()
    );
  }

  ngOnInit() {
    this.obtenerDiscapacidades();
    this.obtenerPais();
    //this.obtenerSedes();
    this.obtenerNivelEstudio();
  }

  identificacion(tipoID: string){
    console.log(tipoID);
    this.tamanioIdentificacio = 9;
    this.mesajeTipoID='El campo solo debe contener valores numéricos un máximo'+ (this.tamanioIdentificacio+1) +' digitos y mínimo 6 digitos.';
    this.patternIdentificacion = '[1-9][0-9]'
    if(tipoID == 'Cédula de extranjería' || 
    tipoID == 'Tarjeta de extrangería' || 
    tipoID == 'Documento de identificación extranjero'){
      this.tamanioIdentificacio = 17;
      this.mesajeTipoID='El campo solo debe contener valores numéricos un máximo'+ (this.tamanioIdentificacio+1) +' digitos y mínimo 6 digitos.';
    }else if(tipoID == 'Pasaporte'){
      this.patternIdentificacion = '[a-zA-Z0-9]';
      this.mesajeTipoID='El campo  debe contener valores alfanuméricos un máximo'+ (this.tamanioIdentificacio+1) +' digitos y mínimo 6 digitos.';
    }
  }

  opcionGuardar(){
    this.btnGuardar=!this.btnGuardar;
  }

  onEditar() {
    this.onEditMode = !this.onEditMode;
  }
  //Método para validar el campo titulo si el programa es musica
  validarTitulo() {
    var validar: boolean = true;
    if (this.titulos.length == 0) {
      validar = false;
    }
    return validar;
  }

  validarIdentificacion() {
    var bandera: boolean = false;
    if (this.user.identificacion == this.identificacionFormControl.value && this.user.identificacion != '' && this.identificacionFormControl != null) {
      this.msgErrorIdentificacion = '';
      bandera = true;
    } else {
      this.msgErrorIdentificacion = 'Los numeros de identificación no coinciden';
    }
    return bandera;
  }

  validarCorreos() {
    var bandera: boolean = true;
    if (this.emailFormControl.value == this.emailFormControl2.value) {
      this.msgErrorcorreo = 'Los correos ingresados deben ser diferentes';
      bandera = false;
    } else {
      this.msgErrorcorreo = '';
    }
    return bandera;
  }

  validarNumeroHihos() {
    if (this.user.num_hijos < 0 || (typeof (this.user.num_hijos) != 'number' && this.user.num_hijos < 0)  ) {
      this.user.num_hijos = 0;
    }
  }

  bloquearAnio: boolean = true;

  //Metodo para poner el año a partir de la fecha de grado
  grado() {
    var bandera: boolean = false;
    if (this.fechaGFormControl.value != null || this.fechaGFormControl.value != '') {
      var fecha = this.fechaGFormControl.value.getFullYear();
      bandera = true;
      this.bloquearAnio = false;
      this.anioGFormControl.setValue(parseInt(fecha));
    }
    return bandera;
  }

  validarCampoAnio(){
    var bandera: boolean = true
    if(!this.grado() && this.anioGFormControl.value == null){
      bandera = false;
    }
    return bandera;
  }



  //Metodos para obtener las localizaciones

  obtenerPais() {
    this.catalogoService.getPaises().subscribe(data => this.paises = data);
  }
  obtenerDepartamentoExp(pais) {
    this.catalogoService.getDepartamentosBy(pais).subscribe(data => this.departamentosExp = data);
  }
  obtenerCiudadExp(departamento) {
    this.catalogoService.getCiudadesBy(departamento).subscribe(data => {
      this.ciudadesExp = data;
      console.log(data);
    });
  }

  obtenerDepartamentoNac(pais) {
    this.catalogoService.getDepartamentosBy(pais).subscribe(data => this.departamentosNac = data);
  }
  obtenerCiudadNac(departamento) {
    this.catalogoService.getCiudadesBy(departamento).subscribe(data => {
      this.ciudadesNac = data;
      console.log(data);
    });
  }

  obtenerDepartamentoRes(pais) {
    this.catalogoService.getDepartamentosBy(pais).subscribe(data => this.departamentosRes = data);
  }
  obtenerCiudadRes(departamento) {
    this.catalogoService.getCiudadesBy(departamento).subscribe(data => {
      this.ciudadesRes = data;
      console.log(data);
    });
  }

  //Método pra cargar los niveles de estudio
  obtenerNivelEstudio() {
    this.catalogoService
      .getNivelEducativo()
      .subscribe(data => (this.niveles_academicos = data));
  }

  //Método pra cargar las sedes
  obtenerSedes() {
    this.sedeFormControl = new FormControl();
    this.catalogoService.getSede().subscribe(data => (this.sedes = data));
  }

  //Método para cargar las facultades
  obtenerFacultad() {
    this.facultadFormControl = new FormControl();
    this.catalogoService
      .getFacultad()
      .subscribe(data => (this.facultades = data));
  }

  //Método pra cargar los programas
  obtenerPrograma() {
    this.programaFormControl = new FormControl();
    this.catalogoService
      .getPrograma(
        this.sedeFormControl.value,
        this.facultadFormControl.value,
        this.nivelAFormControl.value
      )
      .subscribe(data => (this.programas = data));
    this.existenTitulos();
  }

  //Metodo para cargar los titulos
  obtenerTitulo() {
    this.tituloFormControl = new FormControl();
    this.catalogoService
      .getTitulo(this.programaFormControl.value)
      .pipe(map(
        res => res.data
      ))
      .subscribe(data => {
        this.titulos = data;
        console.log(data);
      });

  }
  //valida si el programa seleccionado tiene titulos
  existenTitulos() {
    var validar: boolean = true;
    if (this.titulos.length == 0) {
      validar = false;
    }
    return validar;
  }

  //Métodos habilitar y dashabilitar checkbox discapacidad segun selección
  enDiscapacidadEgresado(idDiscapacidad: number) {
    return this.discapacidadesAux
      .map(dis => dis.idDiscapacidad)
      .includes(idDiscapacidad);
  }

  onCheckDiscapacidad(discapacidad: DiscapacidadInterface, checked: boolean) {
    if (checked) {
      if (discapacidad.Nombre.toLowerCase() == 'ninguna') {
        this.discapacidadesAux = [];
      } else {
        let index = this.discapacidadesAux
          .map(dis => dis.Nombre.toLowerCase())
          .indexOf('ninguna');
        console.log("aqui va " + index);
        if (index >= 0) {
          this.discapacidadesAux.splice(index, 1);
        }
      }
      this.discapacidadesAux.push(discapacidad);
    } else {
      this.discapacidadesAux.splice(
        this.discapacidadesAux
          .map(dis => dis.idDiscapacidad)
          .indexOf(discapacidad.idDiscapacidad),
        1
      );
    }
  }

  //Metodo para habilitar el campo otra discapacidad
  otraDiscapacidad(discapacidad: DiscapacidadInterface, evento: boolean) {
    /*     console.log('Nombre discapacidad' + discapacidad.Nombre);
        console.log('estado' + evento); */
    var aux = -1;
    if (discapacidad.Nombre == 'Otra(s)' && evento) {
      this.respuestaDiscapacidad = true;
      aux = this.discapacidadesAux.indexOf(discapacidad);
    } else if (discapacidad.Nombre == 'Otra(s)' && !evento || discapacidad.Nombre == 'Ninguna') {
      this.respuestaDiscapacidad = false;
      this.user.otraDiscapacidad = "";
    }
    return this.respuestaDiscapacidad;
  }

  //Método pra cargar las discapacidades del usuario
  isLoadingResults: boolean;

  obtenerDiscapacidades() {
    this.catalogoService
      .getDiscapacidad()
      .pipe(
        map(response => {
          console.log(response);
          console.log("Data: " + response.data);
          return response.data;
        }),
        catchError(err => {
          console.log('Error ' + err);
          this.isLoadingResults = false;
          return of([]);
        })
      )
      .subscribe(data => {
        console.log(data);
        this.discapacidades = data;
      });
  }

  discapacidadesEgersado() {
    for (let indice of this.discapacidadesAux) {
      this.discapacidad.splice(indice.idDiscapacidad);
    }
  }

  //Método para guardar las discapacidades del usuario
  discapacidadesUsuario(idDiscapacidad: number, indice: number, event) {
    if (this.discapacidades[indice].Nombre == 'Ninguna' && event.checked) {
      this.discapacidad = [];
      this.discapacidad.push(idDiscapacidad);
    } else if (!this.discapacidad.includes(idDiscapacidad) && event.checked && this.discapacidades[indice].Nombre != 'Ninguna') {
      if (this.discapacidad.includes(1))
        this.discapacidad = [];

      this.discapacidad.push(idDiscapacidad);
    } else {
      this.discapacidad.splice(this.discapacidad.indexOf(idDiscapacidad), 1);
    }
  }

  // Método para validar los datos ingresados por el usuario
  validData() {
    this.discapacidadesEgersado();
    this.opcionGuardar();
    var valid: boolean = false;
    console.log(this.discapacidadesAux);
    if (
      this.validarIdentificacion() &&
      this.validarCorreos() &&
      this.validarCampoAnio() &&
      this.user.nombres.length > 0 &&
      this.user.celular.length > 0 &&
      this.user.telefono_fijo.length > 0 &&
      this.user.apellidos.length > 0 &&
      this.emailFormControl.value != null &&
      this.sedeFormControl.value != null &&
      this.ciudadExpedicionFormControl.value != null &&
      this.ciudadNacimientoFormControl.value != null &&
      this.ciudadResidenciaFormControl.value != null &&
      this.fechaNFormControl.value != null &&
      this.facultadFormControl.value != null &&
      this.programaFormControl.value != null &&
      this.user.genero.length > 0 &&
      this.nivelAFormControl.value != '' &&
      this.anioGFormControl.value != '' &&
      this.grupoEFormControl.value != null &&
      this.estadoCFormControl.value != null &&
      this.user.identificacion.length > 0 &&
      this.user.direccion.length > 0 
      //this.user.discapacidad.length > 0 &&
    ) {
      valid = true;
    } else {
      this.alert.showErrorMessage(
        'Error',
        'Existen campos obligatorios sin diligenciar. Por favor verificar el formulario'
      ).then(result => {
        if (result.value) {
          this.opcionGuardar();
        } 
      });
    }
    return valid;
  }

  // Método para registrar la solicitud
  registrarEgresado() {
    if (this.validData()) {
      this.user.fecha_grado = Utilities.parseDateToString(
        this.fechaGFormControl.value,
        '-'
      );
      this.user.fecha_nacimiento = Utilities.parseDateToString(
        this.fechaNFormControl.value,
        '-'
      );
      this.user.correo = this.emailFormControl.value;
      this.user.correo_alternativo = this.emailFormControl2.value;
      this.user.id_programa = this.programaFormControl.value;
      if (this.fechaGFormControl.value != null) {
        this.user.anio_graduacion = this.fechaGFormControl.value.getFullYear();
      } else {
        this.user.anio_graduacion = this.anioGFormControl.value;
      }
      this.user.grupo_etnico = this.grupoEFormControl.value.toUpperCase();
      this.user.estado_civil = this.estadoCFormControl.value.toUpperCase();
      this.user.id_lugar_expedicion = this.ciudadExpedicionFormControl.value;
      this.user.id_lugar_nacimiento = this.ciudadNacimientoFormControl.value;
      this.user.id_lugar_residencia = this.ciudadResidenciaFormControl.value;
      this.user.id_nivel_educativo = this.nivelAFormControl.value;
      this.user.titulo_especial = this.tituloFormControl.value;
      this.user.discapacidad = this.discapacidad;
      this.user.nombres = (this.user.nombres).toUpperCase();
      this.user.apellidos = (this.user.apellidos).toUpperCase();
      this.user.genero = (this.user.genero).toUpperCase();
      this.registroService.storeEgresado(this.user).subscribe(
        response => {
          this.alert
            .showSuccesMessage(
              'Registro Exitoso',
              'Por favor verifique su correo.' + this.emailFormControl.value
            )
            .then(result => {
              if (result.value) {
                this.router.navigateByUrl('/home');
              } 
            });
        },
        error => {
            this.alert.showErrorMessage(
              'Error',
              'Ha ocurrido un error al registrar sus datos, por favor intente de nuevo o diríjase al área de egresados'
            ).then(result => {
              if (result.value) {
                this.opcionGuardar();
              } 
            });
        }
      );
    }
  }


}
