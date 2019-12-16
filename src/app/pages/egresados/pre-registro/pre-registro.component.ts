import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


import { MatDialog } from '@angular/material/dialog';

// Componentes y Modelos propios
import { User } from '../../../shared/modelos/user';
import { DiscapacidadInterface } from '../../../shared/modelos/discapacidadInterface';
import { SedeInterface } from '../../../shared/modelos/sedeInterface';
import { ProgramaInterface } from '../../../shared/modelos/programaInteface';
import { FacultadInterface } from '../../../shared/modelos/facultadInterface';
import { CatalogosService } from '../../../shared/servicios/common/catalogos.service';
import { Utilities } from '../../../shared/servicios/egresados/utilities';
import { RegistroService } from '../../../shared/servicios/egresados/registro.service';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';




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
    Validators.email,
  ]);
  emailFormControl2 = new FormControl('', [
    Validators.required,
    Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"),
    Validators.email,
  ]);
  sedeFormControl = new FormControl('', [
    Validators.required,
  ]);
  programaFormControl = new FormControl('', [
    Validators.required,
  ]);
  facultadFormControl = new FormControl('', [
    Validators.required,
  ]);
  tituloFormControl = new FormControl('', [
    Validators.required,
  ]);
  fechaGFormControl = new FormControl('', [
    Validators.required,
  ]);
  fechaNFormControl = new FormControl('', [
    Validators.required,
  ]);
  estadoCFormControl = new FormControl('', [
    Validators.required,
  ]);
  grupoEFormControl = new FormControl('', [
    Validators.required,
  ]);
  nivelAFormControl = new FormControl('', [
    Validators.required,
  ]);
  anioGFormControl = new FormControl('', [
    Validators.required,
  ]);
  identificacionFormControl = new FormControl('', [
    Validators.required,
  ]);
  // Variable en la que se almacena los datos ingresados para el preregistro 
  private user: User;

  // Variables para mostrar error presentados en los campos
  private msgError: String;


  //Variables de prueba

  //private sedes = [1, 2, 3, 4, 5];
  //private facultades = ['Facultad Ingenieria Electronica y Telecomunicaciones', 'Facultad de Ingenieria Civil', 'Facultad de Ciencias Naturales y Exactas', 'Facultad de Artes', 'Facultad de Derecho', 'Facultad de Ciencias Contables', 'Facultad de Ciencias Agropecuarias', 'Facultad de Ciencias Humanas'];
  //private programas = ['Musica', 'Medicina', 'Ingenieria de Sistemas', 'Ingenieria Electronica', 'Ingenieria Civil', 'Enfermeria', 'Fonoaudiologia', 'Contaduria Publica'];
  //private discapacidades: string[] = ['Visual', 'Cognitiva', 'Auditiva', 'Fisica', 'Ninguna','todasson','stas tambien','creo ortas'];
  //private niveles_academicos: string[] = ['Pregardo', 'Posgrado'];

  // Variables para almacenar los datos desde el back
  private sedes: SedeInterface[];
  private facultades: FacultadInterface[];
  private programas: ProgramaInterface[];
  private discapacidades: DiscapacidadInterface[] = [];
  private niveles_academicos: NivelesEstudioInterface[];
  private titulos = [1, 2, 3, 4];
  private anios: number[] = [];
  private discapacidad: number[] = [];

  //variables para tomar referencia al año de graduacion
  private fecha: number = new Date().getFullYear();
  private anioIni: number = 1849;


  private generos: string[] = ['Masculino', 'Femenino'];
  private estadosC: string[] = ['Soltero(a)', 'Casado(a)', 'Viudo(a)', 'Union Libre', 'Separado(a)', 'Comprometido(a)', 'Divorciado(a)'];
  private gruposE: string[] = ['Afrodescendiente', 'Indígena', 'Mestizo', 'Blanco', 'Otro'];


  // Variable para capturar y acotar la fecha seleccionada
  private minDate: Date;
  private maxDate: Date;
  private minDateN: Date;
  private maxDateN: Date;

  //Variable para programa con titulo
  private tituloPrograma: string = "Musica";

  constructor(private alert: AlertService, private dialog: MatDialog, private registroService: RegistroService, private catalogoService: CatalogosService, private router: Router) {
    this.cleanFormData();
    this.aniosGrado();

  }

  //Método para obtener los años de grado
  aniosGrado() {
    for (let i = this.anioIni; i <= this.fecha; i++) {
      this.anios.push(i);
    }
  }


  // Método para limpiar datos de control de formulario
  private cleanFormData() {
    this.user = new User("", "", "", 0, "", "", "", "", 0, [], 0, 0, "", "", "", "", 0, "", "", "", "");
    this.msgError = "";
    this.emailFormControl = new FormControl();
    this.emailFormControl2 = new FormControl();
    this.sedeFormControl = new FormControl();
    this.programaFormControl = new FormControl();
    this.facultadFormControl = new FormControl();
    this.fechaGFormControl = new FormControl();
    this.fechaNFormControl = new FormControl();
    this.tituloFormControl = new FormControl();
    this.grupoEFormControl = new FormControl();
    this.estadoCFormControl = new FormControl();
    this.anioGFormControl = new FormControl();
    this.nivelAFormControl = new FormControl();
    this.minDate = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.minDateN = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDateN = new Date(new Date().getFullYear() - 14, new Date().getMonth(), new Date().getDate());
  }

  //Método para validar el campo titulo si el programa es musica
  validarTitulo() {
    var validar: boolean = true;
    if (this.titulos.length > 0 && this.tituloFormControl.value == null) {
      validar = false;
    }
    return validar;
  }

  validarIdentificacion() {
    var respuesta: boolean = true;
    if (this.identificacionFormControl.value == this.user.identificacion) {
      respuesta = false;
    }
    return respuesta;
  }

  //Método pra cargar los niveles de estudio
  obtenerNivelEstudio() {
    this.catalogoService.getNivelEducativo().subscribe(data => this.niveles_academicos = data);
  }


  //Método pra cargar las sedes
  obtenerSedes() {
    this.catalogoService.getSede().subscribe(data => this.sedes = data);
  }

  //Método pra cargar las facultades
  obtenerFacultad() {
    this.catalogoService.getFacultad().subscribe(data => this.facultades = data);
  }


  //Método pra cargar los programas
  obtenerPrograma() {
    this.catalogoService.getPrograma(this.sedeFormControl.value, this.facultadFormControl.value, this.nivelAFormControl.value).subscribe(data => this.programas = data);
  }

  otraDiscapacidad(otraDiscapacidad: String){
    var respuesta: boolean = false;
    if(otraDiscapacidad == "Otra(s)"){
      respuesta = true;
    }
    return respuesta;
  }

  //Método pra cargar las discapacidades del usuario
  obtenerDiscapacidades() {
    this.catalogoService.getDiscapacidad().subscribe(data => this.discapacidades = data);
  }

  //Método para guardar las discapacidades del usuario
  discapacidadesUsuario(discapacidad: number) {
    if (this.discapacidades[discapacidad].nombre == "Ninguno") {
      this.discapacidad = [];
      this.discapacidad.push(discapacidad);
    } else {
      if (!this.discapacidad.includes(discapacidad)) {
        this.discapacidad.push(discapacidad);
      } else {
        this.discapacidad.splice(this.discapacidad.indexOf(discapacidad), 1)
      }
    }

  }

  validarDiscapacidad(discapacidad: String){
    var respuesta: boolean = false;
    if(discapacidad== "Otra(s)"){
      respuesta = true;
    }
        return respuesta;
  }

  ngOnInit() {
    //this.obtenerDiscapacidades();
    this.obtenerSedes();
    this.obtenerNivelEstudio();
  }



  // Método para validar los datos ingresados por el usuario
  validData() {
    var valid: boolean = false;
    console.log("esto es lo que tiene hijos" + this.user.num_hijos);
    console.log("esto es lo que tiene nacimiento" + this.fechaNFormControl.value);
    if (this.user.nombres.length > 0 && this.user.celular.length > 0 && this.user.telefono_fijo.length > 0 && this.user.apellidos.length > 0 &&
      this.emailFormControl.value != null && this.emailFormControl2.value != null && this.sedeFormControl.value != null && this.lExpedicion.ciudadFormControl.value != '' &&
      this.lExpedicion.departamentoFormControl.value != '' && this.lExpedicion.paisFormControl.value != '' && this.fechaNFormControl.value != null && this.facultadFormControl.value != null &&
      this.programaFormControl.value != null && this.validarTitulo() && this.user.genero.length > 0 && this.nivelAFormControl.value != '' && this.anioGFormControl.value != '' && this.grupoEFormControl.value != null && this.estadoCFormControl.value != null &&
      this.user.identificacion.length > 0 && this.user.direccion.length > 0 //this.user.discapacidad.length > 0 &&
    ) {

      valid = true;
      this.msgError = "";
    } else {

      this.msgError = "Error: Todos los campos son obligatorios";
    }
    return valid;
  }

  // Método para registrar la solicitud
  register() {

    console.log("Datos validos" + this.anioGFormControl.value);
    if (this.validData()) {

      this.user.fecha_grado = Utilities.parseDateToString(this.fechaGFormControl.value, '-');
      this.user.fecha_nacimiento = Utilities.parseDateToString(this.fechaNFormControl.value, '-');
      this.user.correo = this.emailFormControl.value;
      this.user.correo_alternativo = this.emailFormControl2.value;
      this.user.id_programa = this.programaFormControl.value;
      this.user.anio_graduacion = this.anioGFormControl.value;
      this.user.grupo_etnico = this.grupoEFormControl.value;
      this.user.estado_civil = this.estadoCFormControl.value;
      this.user.id_lugar_expedicion = this.lExpedicion.obtenerIdLocalizacion();
      this.user.id_lugar_nacimiento = this.lNacimiento.obtenerIdLocalizacion();
      this.user.id_lugar_residencia = this.lResidencia.obtenerIdLocalizacion();
      this.user.id_nivel_educativo = this.nivelAFormControl.value;
      this.user.discapacidad = this.discapacidad;
      this.registroService.storeEgresado(this.user).subscribe(
        response => {
          this.alert.showSuccesMessage('Registro Exitoso', 'Por favor verifique su correo.' + this.emailFormControl.value).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/home');
            } else {
              this.alert.showSuccesMessage('Registro Exitoso', 'Por favor verifique su correo.');
            }

          });
        }, error => {
          this.alert.showErrorMessage('Error', 'A ocurrido un error al registrar sus datos intente de nuevo');
        }
      );
    }
  }

}


