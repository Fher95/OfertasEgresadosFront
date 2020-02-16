import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


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

  // Variables para almacenar los datos desde el back
  private sedes: SedeInterface[];
  private facultades: FacultadInterface[];
  private programas: ProgramaInterface[];
  private discapacidades: DiscapacidadInterface[];
  private niveles_academicos: NivelesEstudioInterface[];
  private titulos: TituloInterface[];
  private anios: number[] = [];
  private discapacidad: number[] = [];

  //variables para tomar referencia al año de graduacion
  private fecha: number = new Date().getFullYear();
  private anioIni: number = 1849;


  private generos: string[] = ['MASCULINO', 'FEMENINO'];
  private estadosC: string[] = ['NINGUNO','SOLTERO(A)', 'CASADO(A)','VIUDO(A)','UNION LIBRE','SEPARADO(A)','COMPROMETIDO(A)','DIVORCIADO(A)'];
  private gruposE: string[] = ['NINGUNO','AFRODESCENDIENTE', 'INDÍGENA', 'MESTIZO', 'BLANCO', 'OTRO'];


  // Variable para capturar y acotar la fecha seleccionada
  private minDate: Date;
  private maxDate: Date;
  private minDateN: Date;
  private maxDateN: Date;

  //Variable para programa con titulo
private tituloPrograma: string = "Musica";

  private respuestaDiscapacidad: boolean = false;

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
    this.user = new User("", "", "", 0, "", "", "", "", 0, [],"", 0, 0, "", "", "", "", 0, "", "", "", "");
    this.msgError = "";
    this.titulos = [];
    this.discapacidades = [];
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
    this.sedeFormControl = new FormControl();
    this.programaFormControl = new FormControl();
    this.facultadFormControl = new FormControl();
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

  obtenerTitulo(){
    this.catalogoService.getTitulo(this.programaFormControl.value).subscribe(data => this.titulos = data);
  }

  existenTitulos(){
    var respuesta: boolean = false;
    if(this.titulos.length>0){
      respuesta = true;
    }
    return respuesta;
  }

  otraDiscapacidad(indice: number,event){
    console.log("Nombre discapacidad"+this.discapacidades[indice].Nombre );
    if(this.discapacidades[indice].Nombre == "Otra(s)" && event.checked){
      this.respuestaDiscapacidad = true;
    }else {
      this.respuestaDiscapacidad = false;
    }
    return this.respuestaDiscapacidad;

  }


  //Método pra cargar las discapacidades del usuario
  obtenerDiscapacidades() {
    this.catalogoService.getDiscapacidad().subscribe(data => {
      this.discapacidades = data;
      console.log(this.discapacidades);
    });
  }



  //Método para guardar las discapacidades del usuario
  discapacidadesUsuario(idDiscapacidad: number,indice: number,event) {
    console.log("Indice: "+indice);
    if (this.discapacidades[indice].Nombre == "NINGUNA" && event.checked) {
      this.discapacidad = [];
      this.discapacidad.push(idDiscapacidad);
    } else if (!this.discapacidad.includes(idDiscapacidad) && event.checked && this.discapacidades[indice].Nombre != "Ninguna") {
        this.discapacidad.push(idDiscapacidad);
      } else {
        this.discapacidad.splice(this.discapacidad.indexOf(idDiscapacidad), 1)
      }
    console.log("discapacidades: "+this.discapacidad);
  }

  ngOnInit() {
    this.obtenerDiscapacidades();
    //this.obtenerTitulo();
    this.obtenerSedes();
    this.obtenerNivelEstudio();
  }



  // Método para validar los datos ingresados por el usuario
  validData() {
    var valid: boolean = false;
    if (this.user.nombres.length > 0 && this.user.celular.length > 0 && this.user.telefono_fijo.length > 0 && this.user.apellidos.length > 0 &&
      this.emailFormControl.value != null && this.emailFormControl2.value != null && this.sedeFormControl.value != null && this.lExpedicion.ciudadFormControl.value != '' &&
      this.lExpedicion.departamentoFormControl.value != '' && this.lExpedicion.paisFormControl.value != '' && this.fechaNFormControl.value != null && this.facultadFormControl.value != null &&
      this.programaFormControl.value != null  && this.user.genero.length > 0 && this.nivelAFormControl.value != '' && this.anioGFormControl.value != '' && this.grupoEFormControl.value != null && this.estadoCFormControl.value != null &&
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
      this.user.titulo_especial = this.tituloFormControl.value;
      this.user.discapacidad = this.discapacidad;
      this.registroService.storeEgresado(this.user).subscribe(
        response => {
          this.alert.showSuccesMessage('Registro Exitoso', 'Por favor verifique su correo.'+this.emailFormControl.value).then((result)=>{
            if(result.value){
              this.router.navigateByUrl('/home');
            }else{
              this.alert.showSuccesMessage('Registro Exitoso', 'Por favor verifique su correo.');
            }
            
          });
        },error => {
          let err = <any>error;
          if(err==422){
            this.alert.showErrorMessage('Error', 'Ya hay una cuenta con los datos ingresados.');
          }else{
            this.alert.showErrorMessage('Error', 'A ocurrido un error al registrar sus datos intente de nuevo');
          }
        }
      );
    }   
  }

}


