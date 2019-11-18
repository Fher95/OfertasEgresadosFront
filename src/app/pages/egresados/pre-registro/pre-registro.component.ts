import { Component, OnInit, ViewChild  } from '@angular/core';
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
import {ErrorStateMatcher} from '@angular/material/core';
import { NivelesEstudioInterface } from 'src/app/shared/modelos/nivelesEstudioInterface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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


  matcher = new MyErrorStateMatcher();

  // Variable en la que se almacena los datos ingresados
  private user: User;

  // Variables para mostrar error presentados en los campos
  private msgError: String;


  // Variables
  //private sedes = [1, 2, 3, 4, 5];

  //private facultades = ['Facultad Ingenieria Electronica y Telecomunicaciones', 'Facultad de Ingenieria Civil', 'Facultad de Ciencias Naturales y Exactas', 'Facultad de Artes', 'Facultad de Derecho', 'Facultad de Ciencias Contables', 'Facultad de Ciencias Agropecuarias', 'Facultad de Ciencias Humanas'];
  //private programas = ['Musica', 'Medicina', 'Ingenieria de Sistemas', 'Ingenieria Electronica', 'Ingenieria Civil', 'Enfermeria', 'Fonoaudiologia', 'Contaduria Publica'];
  private sedes: SedeInterface[];
  private facultades: FacultadInterface[];
  private programas: ProgramaInterface[];
  private discapacidades: DiscapacidadInterface[] = [];
  //private discapacidades: string[] = ['Visual', 'Cognitiva', 'Auditiva', 'Fisica', 'Ninguna'];
  private generos: string[] = ['Masculino', 'Femenino', 'Otro'];
  //private niveles_academicos: string[] = ['Pregardo', 'Posgrado'];
  private niveles_academicos: NivelesEstudioInterface[];
  private titulos = [1,2,3,4];
  private estadosC: string[] = ['Casado','Soltero','Divorciado','Unión Libre','Viudo','Seprado','Comprometido'];
  private gruposE: string[] = ['Afrodecendiente','Indigena','Mestizo','Blanco','Otro'];
  private i: number = 0;
  private anioIni:number = 1849;
  private anios: number[]=[];
  private fecha:number = new Date().getFullYear();
  private discapacidad: string[] = [];


  // Variable para capturar y acotar la fecha seleccionada
  private dateControl: FormControl;
  private minDate: Date;
  private maxDate: Date;
  private minDateN: Date;
  private maxDateN: Date;


  constructor(private dialog: MatDialog, private registroService: RegistroService, private catalogoService: CatalogosService, private router: Router) {
    this.cleanFormData();
    this.aniosGrado();
    
  }

  //funcion para tener los años de grado
  aniosGrado(){
    for (let i = this.anioIni; i <= this.fecha; i++) {
      this.anios.push(i);
    }
  }


  // Método para limpiar datos de control de formulario
  private cleanFormData() {
    this.user = new User("", "", "", 0, "", "", "", "", [], 0, 0,"",false, "", "", 0,"", "","","");
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
    //this.dateControl = new FormControl();
    //this.dateControl.disable();
    this.minDate = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() );
    this.minDateN = new Date(new Date().getFullYear() - 170, 0, 1);
    this.maxDateN = new Date(new Date().getFullYear() - 14,new Date().getMonth(),new Date().getDate() );
  }

  validarTitulo(){
    var validar: boolean=true;
    if(this.programaFormControl.value ==  "Musica" && this.tituloFormControl.value == null){
      validar=false;
    }
    return validar;
  }

  obtenerNivelEstudio(){
    this.catalogoService.getNivelEducativo().subscribe(data => this.niveles_academicos = data);
  }

  obtenerSedes(){
    this.catalogoService.getSede().subscribe(data => this.sedes = data);
  }

  obtenerFacultad(){
    this.catalogoService.getFacultad(this.sedeFormControl.value).subscribe(data => this.facultades = data);
  }

  obtenerPrograma(){
    this.catalogoService.getPrograma(this.sedeFormControl.value,this.facultadFormControl.value,this.nivelAFormControl.value).subscribe(data => this.programas = data);
  }

  obtenerDiscapacidades(){
    this.catalogoService.getDiscapacidad().subscribe(data => this.discapacidades = data);
   }
 
   discapacidadesUsuario(discapacidad:string){
     if(!this.discapacidad.includes(discapacidad)){
       this.discapacidad.push(discapacidad);
     }else{
       this.discapacidad.splice(this.discapacidad.indexOf(discapacidad),1)
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
    if (this.user.nombres.length > 0 && this.user.celular.length > 0 && this.user.telefono_fijo.length > 0 && this.user.apellidos.length > 0 && 
      this.emailFormControl.value != null && this.emailFormControl2.value != null && this.sedeFormControl.value != null && this.lExpedicion.ciudadFormControl.value != '' && this.lExpedicion.departamentoFormControl.value != ''&& this.lExpedicion.paisFormControl.value != '' && this.fechaNFormControl.value != null
       && this.facultadFormControl.value != null && this.programaFormControl.value != null && this.validarTitulo() && this.user.genero.length > 0 && //this.user.discapacidad.length > 0 && 
      this.user.mension != false && this.nivelAFormControl.value != '' && this.anioGFormControl.value != '' && this.grupoEFormControl.value != null && this.estadoCFormControl.value != null && this.user.identificacion.length > 0 && this.user.direccion.length > 0
      ) {
      valid = true;
      this.msgError = "";
    } else {
      this.msgError = "Error: Todos los campos son obligatorios";
    }
    console.log('hola mundo '+valid);
    console.log(this.discapacidad);
    return true;
  } 

  // Método para registrar la solicitud
  register() {
    if (this.validData()) {
      console.log("Datos validos");
      this.user.fecha_grado = Utilities.parseDateToString(this.fechaGFormControl.value, '-');
      this.user.fecha_nacimiento = Utilities.parseDateToString(this.fechaNFormControl.value,'-');
      this.user.correo = this.emailFormControl.value;
      this.user.correo_alternativo = this.emailFormControl2.value;
      this.user.id_programa = this.programaFormControl.value;
      this.user.anio_graduacion = this.anioGFormControl.value;
      this.user.grupo_etnico = this.grupoEFormControl.value;
      this.user.estado_civil = this.estadoCFormControl.value;
      this.user.id_lugar_expedicion =this.lExpedicion.obtenerIdLocalizacion();
      this.user.id_lugar_nacimiento =this.lNacimiento.obtenerIdLocalizacion();
      this.user.id_lugar_residencia =this.lResidencia.obtenerIdLocalizacion();
      this.user.id_nivel_educativo = this.programaFormControl.value;
      this.user.discapacidad = this.discapacidad;
      if(this.programaFormControl.value == 'Musica'){
        this.user.id_nivel_educativo = this.tituloFormControl.value;
      } else{
        this.user.id_nivel_educativo = this.programaFormControl.value;
      }         
      
      this.registroService.storeEgresado(this.user).subscribe(
        response => {
          this.user = (<any>response).user;
          if (!this.user.identificacion) {
            this.msgError = "Error al registrarse, intente de nuevo";
          } else {
            this.openDialog();
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
  openDialog() {
    var info: Information = { title: "Solicitud Enviada", message: "El Area de Egresados  revisará la solicitud en los proximos días y se notificará la respuesta al correo electronico " + this.emailFormControl2.value };
    this.dialog.open(InfoDialogComponent, { data: info }).beforeClosed().subscribe(result => {
      this.router.navigateByUrl("home");
      this.cleanFormData();
    });
  }

}