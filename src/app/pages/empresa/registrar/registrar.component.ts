import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ISector } from '../../../shared/modelos/sectorInterface'
import { ISubSector } from '../../../shared/modelos/subSectorInterface'
import { ICargo } from '../../../shared/modelos/cargoInterface'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogFinalRegistroComponent } from '../dialog-final-registro/dialog-final-registro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  @ViewChild('logoInput') logoInput;

  sectoresInteresEmpresa: ISector[];
  cargos: ICargo[];
  subSecEscogidos: ISubSector[];
  anios: any[];
  mensajesError: String[];

  paises: Object;
  departamentos: Object;
  ciudades: Object;

  debouncer: any;
  code: string;
  isLinear = true;
  contOculto = true;

  formRegistroEmp: FormGroup;

  constructor(
    private servGenerales: GeneralesService,
    private formBuilder: FormBuilder,
    private empService: EmpresaService,
    private matDialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.cargos = [];
    this.sectoresInteresEmpresa = [];
    this.subSecEscogidos = [];
    this.anios = [];
    this.mensajesError = [];

    // Formulario
    this.formRegistroEmp = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")], this.validarExistenciaEmail.bind(this)],
        contrasenia: ['', [Validators.required, Validators.pattern("^([1-zA-Z0-1@.\s]{1,255}).{5,}$")]],
        captchaDigitado: [''],
      }),
      'datos-generales-empresa': this.formBuilder.group({
        NIT: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)], this.validarExistenciaNIT.bind(this)],
        razonSocial: [null, Validators.required],
        nombreEmpresa: [null, Validators.required],
        anioCreacion: [null, Validators.required],
        numEmpleados: [null, [Validators.required, Validators.min(0)]],
        ingresosEmp: [null],
        descripcionEmpresa: [null, Validators.required],
      }),
      'sectores': this.formBuilder.group({
        subsectores: [[], [Validators.required, this.sectorValidator]],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        paisEmp: [null, Validators.required],
        departamentoEmp: [null, Validators.required],
        ciudadEmp: [null, Validators.required],
        direccionEmp: [null, Validators.required],
        barrioEmp: [null, Validators.required],
        codigoPostalEmp: [null, Validators.min(0)],
        telefonoEmp: [null, [Validators.required, Validators.min(0)]],
        emailEmp: [null, [Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
        sitioWebEmp: [null],
      }),
      'datos-resp': this.formBuilder.group({
        nombrereplegal: [null, Validators.required],
        apellidoreplegal: [null, Validators.required],
        telefonoreplegal: [null, Validators.min(0)],
        telefonoMovilreplegal: [null, [Validators.required, Validators.min(0)]],
        nombreResp: [null, Validators.required],
        apellidoResp: [null, Validators.required],
        cargo: [null, Validators.required],
        telefonoResp: [null, Validators.min(0)],
        telefonoMovilResp: [null, [Validators.required, Validators.min(0)]],
        horarioContactoResp: [null],
        direccionTrabajoResp: [null, Validators.required],
        emailCorpResp: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      }),
      'archivos': this.formBuilder.group({
        logo: [''],
        camaraycomercio: [''],
      })
    });
  }

  ngOnInit() {
    this.cargarPaises();
    this.cargarAnios();
    this.cargarSectoresInteres();
    this.cargarCargos();
  }

  /**
   * Manda el formulario de registro a los servicios de la empresa
   * encargados de las peticiones.
   * <p>
   * Si existe un error al cargarlo imprime en la consola el error
   * @param  formulario  Id del pais escogido en la lista de departamentos
   */
  registrarEmpresa(formulario) {
    let formData = new FormData();
    //getrawvaluec
    formData.append('datos', JSON.stringify(this.formRegistroEmp.getRawValue()));
    console.log(Object.assign({}, formulario.value));
    if(this.fileInput.nativeElement.files[0]){
      formData.append('fileInput', this.fileInput.nativeElement.files[0]);
    }
    if(this.logoInput.nativeElement.files[0]){
      formData.append('logoInput', this.logoInput.nativeElement.files[0]);
    }
    console.log('formulario', JSON.stringify(formulario.value));
    this.empService.registrarUsuario(formData).toPromise().then(data => {
      console.log("registro datos de la empresa exitosos", data);
      this.openDialog();
      //Al enviar los archivos se muestra el dialog y se termina el registro
      //this.enviarArchivos(data);
    },
      errorRegistro => {
        this.mensajesError = [];
        // Obteniendo todas las claves del JSON
        for (var clave in errorRegistro.error) {
          // Controlando que json realmente tenga esa propiedad
          if (errorRegistro.error.hasOwnProperty(clave)) {
            // Mostrando en pantalla la clave junto a su valor
            this.mensajesError.push(errorRegistro.error[clave]);
          }
        }
      });
  }

  /**
  * Carga los archivos PDF y JPG que escoge el usuario de su equipo y lo guarda en
  * un formData el cual es necesario para enviar un archivo por peticion.
  * Realiza una peticion por aparte para enviar los archivos de una empresa
  * llamando a un método del servicio empresa.
  * @param idEmpresa el id de la empresa al cual se le añadiran los archivos
  */
  enviarArchivos(idEmpresa) {
    let formData = new FormData();
    formData.append('fileInput', this.fileInput.nativeElement.files[0]);
    formData.append('logoInput', this.logoInput.nativeElement.files[0]);
    this.empService.subirArchivos(formData, idEmpresa).toPromise().then(data => {
      this.openDialog();
    },
      error => {
        this.mensajesError = [];
        this.mostrarError();
        this.mensajesError.push("Error al subir los archivos");
      });
  }

  /**
  * Carga los archivos PDF que escoge el usuario de su equipo y lo guarda en
  * un formData el cual es necesario para enviar un archivo por peticion
  */
  elegirArchivo() {
    let formData = new FormData();
    formData.append('fileInput', this.fileInput.nativeElement.files[0]);
    this.formRegistroEmp.controls['archivos'].get('camaraycomercio').setValue(formData);
  }

  /**
  * Carga los archivos JPG que escoge el usuario de su equipo y lo guarda en
  * un formData el cual es necesario para enviar un archivo por peticion
  */
  elegirLogo() {
    let formData = new FormData();
    formData.append('logoInput', this.logoInput.nativeElement.files[0]);
    this.formRegistroEmp.controls['archivos'].get('logo').setValue(formData);
  }

  /**
 * Carga la lista paises, envia al servicio general encargado
 * de realizar las peticiones
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 */
  cargarPaises() {
    this.servGenerales.obtenerListaPaises().subscribe(resultado => {
      this.paises = resultado;
    },
      error => {
        this.mostrarError();
        console.log("Error al obtener los paises: ", JSON.stringify(error));
      });
  }
  /**
 * Carga la lista departamentos, envia al servicio general encargado
 * de realizar las peticiones
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 * @param  idPais  Id del pais escogido en la lista de paises
 */
  cargarDepartamentos(idPais: string) {
    console.log(idPais);
    this.servGenerales.obtenerListaDepartamentos(idPais).subscribe(resultado => {
      this.departamentos = resultado;
    },
      error => {
        this.mostrarError();
        console.log("Error al obtener los deprtamentos: ", JSON.stringify(error));
      });
  }
  /**
 * Carga la lista ciudades, envia al servicio general encargado
 * de realizar las peticiones
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 * @param  idDepartamento  Id del pais escogido en la lista de departamentos
 */
  cargarCiudades(idDepartamento: string) {
    //Llama al servicio general de peticiones http
    this.servGenerales.obtenerListaCiudades(idDepartamento).subscribe(resultado => {
      this.ciudades = resultado;
    },
      error => {
        this.mostrarError();
        console.log("Error al obtener las ciudades: ", JSON.stringify(error));
      });
  }
  /**
 * Crea la lista anios desde 1900 hasta el año actual mediante un ciclo
 * <p>
 */
  cargarAnios() {
    //Toma el año actual
    let anio = new Date().getFullYear();
    //Empieza a llenar los años desde 1990 hasta el año actual
    for (let i = anio; i >= 1900; i--) {
      this.anios.push(i);
    }
  }
  /**
 * Carga la lista sectoresInteresEmpresa mediante una peticion al back
 * { "Nombre": "", "subSectores": [{ "idSector": "", "nombre": "" },...]
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 */
  cargarSectoresInteres() {
    this.servGenerales.obtenerListaSectoresYSubSectores().subscribe(resultado => {
      this.sectoresInteresEmpresa = resultado;
    },
      error => {
        this.mostrarError();
        console.log("Error al obtener los Sectores: ", JSON.stringify(error));
      });
  }
  /**
 * Carga la lista cargos mediante una peticion al back
 * [{id_aut_cargos:1, nombre:"Docente"}, ...]
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 */
  cargarCargos() {
    this.servGenerales.obtenerListaCargos().subscribe(resultado => {
      this.cargos = resultado;
    },
      error => {
        this.mostrarError();
        console.log("Error al obtener los cargos: ", error);
      });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  /**
 * Genera el codigo del captcha
 */
  onGenerateCode(code) {
    this.code = code
  }
  /**
   * Verifica si el captcha digitado coincide con el captcha creado
   * <p>
   * Si no es el mismo imprime un alert de captcha invalido
   */
  verify() {
    const captchaDigitado = (<HTMLInputElement>document.getElementById("capt")).value;
    console.log(captchaDigitado);
    if (this.code === captchaDigitado) {
      const elemento = document.getElementById("1");
      elemento.style.display = 'inline';
    } else {
      this.mostrarMensaje('Captcha invalido');
    }
  }

  /**
 * IMPORTANTE: Funciona dependiente del id del sector, si se cambia el id del sector hacer metodo
 * para buscar la posicion del sector que contiene el subsector
 * elimina un subSector escogido a partir de la lista de sectores en el formulario de registro
 * se elimina de la lista subSecEscogidos y se actualiza en la lista sectores del ngForm
 * <p>
 * Se busca en la lista de escogidos
 * @param  subSector  objeto subSector que contiene { idSector: number; nombre: string; }
 */
  eliminarSubSectorEscogido(subSector: ISubSector) {
    console.log(subSector);
    //Se busca en la lista de escogidos
    let posSubSector = this.subSecEscogidos.indexOf(subSector);
    //Se elimina en la lista de escogidos
    this.subSecEscogidos.splice(posSubSector, 1);
    //Se devuelve a la lista general
    this.sectoresInteresEmpresa[subSector.idSector - 1].subSectores.push(subSector);
    //Se iguala nuevamente el valor del formControl
    this.formRegistroEmp.controls['sectores'].get('subsectores').setValue(this.formatSectoresEscogidos());
    //Se ordena
    this.sectoresInteresEmpresa[subSector.idSector - 1].subSectores.sort(function (a, b) {
      return a.idSubSector - b.idSubSector
    });
  }
  /**
 * agrega un subSector escogido a partir de la lista de sectores en el formulario de registro
 * se agrega a la lista subSecEscogidos y se actualiza en la lista sectores del ngForm
 * <p>
 * Se busca en la lista de escogidos
 * @param  sector  objeto sector que contiene { Nombre: string; subSectores: ISubSector[]; }
 * @param  subSector  objeto subSector que contiene { idSector: number; nombre: string; }
 */
  seleccionarSubSector(sector: ISector, subSector: ISubSector) {
    //Se busca la posicion del sector en la lista de sectores general
    const posSector = this.sectoresInteresEmpresa.indexOf(sector);
    //Se busca la posicion del subSector en la lista de general
    const posSubSector = this.sectoresInteresEmpresa[posSector].subSectores.indexOf(subSector);
    //Se elimina en sector de la lista general
    this.sectoresInteresEmpresa[posSector].subSectores.splice(posSubSector, 1);
    //Se agrega el subsector a la lista de escogidos
    this.subSecEscogidos.push(subSector);
    //Se actualiza el valor del formControl
    this.formRegistroEmp.controls['sectores'].get('subsectores').setValue(this.formatSectoresEscogidos());
  }
  /**
 * Vuelve la lista sectoresEscogidos [{idSubSector, nombre, idSector}, ... ]
 * a la forma [idSubSector, idSubSector, ...]
 */
  formatSectoresEscogidos() {
    let listaAuxiliar = [];
    for (const subSector of this.subSecEscogidos) {
      listaAuxiliar.push(subSector.idSubSector);
    }
    return listaAuxiliar;
  }

  /**
 * Validador personalizado para saber si el usuario escoge o no sectores
 * <p>
 * Verifica a partir de la lista de sectores escogidos, si esta vacia devuelve true
 * lo cual significa que esta invalido
 * @param  control  permite obtener el valor en tiempo real de la lista sectores del ngForm }
 */
  sectorValidator(control: FormControl) {
    let lista = control.value;
    //Si la lista no esta vacia
    if (lista.length != 0) {
      return true;
    }
    //En caso contrario se deja pasar
    return null;
  }
  /**
 * Validador personalizado para saber si el email escrito existe
 * Verifica a partir de una peticion al back que es realizada por el metodo de servicios
 * de la empresa
 * <p>
 * Si el email existe devuelve el error 'EmailExiste', en caso contrario devuelve null
 * @param  control  permite obtener el valor en tiempo real del input email del ngForm }
 */
  validarExistenciaEmail(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      if (control.value != "") {
        this.debouncer = setTimeout(() => {
          this.servGenerales.validarEmail(control.value).subscribe((res) => {
            console.log(res)
            if (res == 'Correcto') {
              resolve(null);
            }
            else {
              resolve({ 'EmailExiste': true });
            }
          }, (err) => {
            resolve({ 'EmailExiste': true });
          });
        }, 10);
      }
    });
  }
  /**
 * Validador personalizado para saber si el NIT escrito existe
 * Verifica a partir de una peticion al back que es realizada por el metodo de servicios
 * de la empresa
 * <p>
 * Si el NIT existe devuelve el error 'NITExiste', en caso contrario devuelve null
 * @param  control  permite obtener el valor en tiempo real del input NIT del ngForm }
 */
  validarExistenciaNIT(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      if (control.value != "") {
        this.debouncer = setTimeout(() => {
          this.servGenerales.validarNIT(control.value).subscribe((res) => {
            console.log(res);
            if (res == 'Correcto') {
              resolve(null);
            }
            else {
              resolve({ 'NITExiste': true });
            }
          }, (err) => {
            resolve({ 'NITExiste': true });
          });

        }, 10);
      }
    });
  }

  /**
 * Abre un dialog de angular material
 * El contenido del dialog esta creado en el componente DialogFinalRegistroComponent
 * <p>
 * Si se cierra el dialog redirige a la pagina principal
 */
  openDialog() {
    const dialogRef = this.matDialog.open(DialogFinalRegistroComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/home']);
    });
  }

  /**
 * Abre un snackbar de angular material
 * Su contenido es un mensaje de error generico para el usuario
 * si en caso tal no se carguen los datos necesarios para crear
 * el formulario de registro para una empresa
 * <p>
 * Duracion: 5 segundos
 */
  mostrarError() {
    this.snackBar.open("Error, recargue la pagina e intentelo de nuevo", "Aceptar", {
      duration: 5000,
    });
  }

  /**
 * Abre un snackbar de angular material
 * Su contenido es un mensaje pasado por parametro
 * <p>
 * Duracion: 5 segundos
 * @param mensaje contiene el mensaje a mostrar en el snackbar
 */
  mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, "Aceptar", {
      duration: 5000,
    });
  }
}
