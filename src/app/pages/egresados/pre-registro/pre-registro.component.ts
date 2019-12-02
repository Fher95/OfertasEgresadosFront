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
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';




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
  //private discapacidades: string[] = ['Visual', 'Cognitiva', 'Auditiva', 'Fisica', 'Ninguna'];
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
  private estadosC: string[] = ['Soltero(a)', 'Casado(a)','Viudo(a)','Union Libre','Separado(a)','Comprometido(a)','Divorciado(a)'];
  private gruposE: string[] = ['Afrodescendiente', 'Indígena', 'Mestizo', 'Blanco', 'Otro'];


  // Variable para capturar y acotar la fecha seleccionada
  private minDate: Date;
  private maxDate: Date;
  private minDateN: Date;
  private maxDateN: Date;

  //Variable para programa con titulo
private tituloPrograma: string = "Musica";

  constructor(private dialog: MatDialog, private registroService: RegistroService, private catalogoService: CatalogosService, private router: Router) {
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
    this.user = new User("", "", "", 0, "", "", "", "",0, [], 0, 0, "", false, "", "", 0, "", "", "", "");
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
    this.nivelAFormControl =  new FormControl();
    this.minDate = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.minDateN = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDateN = new Date(new Date().getFullYear() - 14, new Date().getMonth(), new Date().getDate());
  }

  //Método para validar el campo titulo si el programa es musica
  validarTitulo() {
    var validar: boolean = true;
    if (this.programaFormControl.value == this.tituloPrograma && this.tituloFormControl.value == null) {
      validar = false;
    }
    return validar;
  }

  validarIdentificacion(){
    var respuesta: boolean = true;
    if(this.identificacionFormControl.value==this.user.identificacion){
      respuesta=false;
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
    this.catalogoService.getFacultad(this.sedeFormControl.value).subscribe(data => this.facultades = data);
  }


  //Método pra cargar los programas
  obtenerPrograma() {
    this.catalogoService.getPrograma(this.sedeFormControl.value, this.facultadFormControl.value, this.nivelAFormControl.value).subscribe(data => this.programas = data);
  }

  //Método pra cargar las discapacidades del usuario
  obtenerDiscapacidades() {
    this.catalogoService.getDiscapacidad().subscribe(data => this.discapacidades = data);
  }

  //Método para guardar las discapacidades del usuario
  discapacidadesUsuario(discapacidad: number) {
    if (!this.discapacidad.includes(discapacidad)) {
      this.discapacidad.push(discapacidad);
    } else {
      this.discapacidad.splice(this.discapacidad.indexOf(discapacidad), 1)
    }

  }

  ngOnInit() {
    this.obtenerDiscapacidades();
    this.obtenerSedes();
    this.obtenerNivelEstudio();
  }



  // Método para validar los datos ingresados por el usuario
  validData() {
    var valid: boolean = false;
    console.log("esto es lo que tiene hijos"+this.user.numero_hijos);
    console.log("esto es lo que tiene nacimiento"+this.fechaNFormControl.value);
    if (this.user.nombres.length > 0 && this.user.celular.length > 0 && this.user.telefono_fijo.length > 0 && this.user.apellidos.length > 0 && 
      this.emailFormControl.value != null && this.emailFormControl2.value != null && this.sedeFormControl.value != null && this.lExpedicion.ciudadFormControl.value != '' && 
      this.lExpedicion.departamentoFormControl.value != ''&& this.lExpedicion.paisFormControl.value != '' && this.fechaNFormControl.value != null && this.facultadFormControl.value != null && 
      this.programaFormControl.value != null && this.validarTitulo() && this.user.genero.length > 0 && this.user.mension != false && 
      this.nivelAFormControl.value != '' && this.anioGFormControl.value != '' && this.grupoEFormControl.value != null && this.estadoCFormControl.value != null && 
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
    console.log("Datos validos"+this.anioGFormControl.value);
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
          this.user = (<any>response).user;
          if (!this.user.identificacion) {
            this.msgError = "Error al registrarse, intente de nuevo";
          } else {
            this.abrirDialogo();
          }
        },
        error => {
          let err = <any>error;
          if (err != null) {
            this.msgError = err.error.message;
          }
        }
      );
    }   
  }



  // Método para abrir dialogo de información exitosa
  abrirDialogo() {
    var info: Information = { title: "Pre-Registro Exitoso", message: "Se ha enviado una notificación para la verificación del registro al correo electronico " + this.emailFormControl.value  };
    this.dialog.open(InfoDialogComponent, { data: info }).beforeClosed().subscribe(result => {
      this.router.navigateByUrl("/home");
      this.cleanFormData();
    });
  }

}


