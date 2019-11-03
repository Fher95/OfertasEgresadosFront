import { Component, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ISector } from '../../../shared/modelos/sectorInterface'
import { ISubSector } from '../../../shared/modelos/subSectorInterface'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { MatDialog } from '@angular/material';
import { DialogFinalRegistroComponent } from '../dialog-final-registro/dialog-final-registro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  /*sectoresInteresEmpresa: Object = [
    { "Nombre": "Estatal y Relacionados", "subSector": [{'id':1, 'nombre': "Medio ambiente"}, {'id':1, 'nombre': "Minas y Energia"}, "Organizacion no Gubernamental", "Planeacion", "Relaciones Exteriores", "Residencia, Gobernaciones", "Salud, Trabajo y Seguridad", "Servicios Publicos", "Economia Desarrollo Ecologico", "Educacion, Cultura y Turismo", "Estadistica", "Funcion Publica", "Gremios y Asociaciones", "Interior, Control y org", "Justicia del Derecho", "Agricultura y Desarrollo", "Ciencia y Tecnologia", "Comercio Exterior", "Comunicacion", "Defensa y Seguridad Nacional"] },
    { "Nombre": "Alimentos", "subSector": ["Aceites y Grasas Comestibles", "Alimentos Para Animales", {'id':2, 'nombre': "Azúcar"}, "Batidos", "Café Exportadores", "Chocolate y confiteria", "Conservas, Pasabocas", "Lácteos", "Molinera de Arroz", "Molinería de Productos de Trigo", "Pastas, Panadería y Galletas"] },
    { "Nombre": "Comercio al por Menor", "subSector": ["Almacenes de cadena", "Almacenes Varios", "Concesionarios", "Droguerias", "Estaciones de Servicio", "Ferreteria", "Hipermercados", "Supermercados", "Tiendas"] },
    { "Nombre": "Comercio al por Mayor", "subSector": ["Comercio al por Mayor"] },
    { "Nombre": "Construccion", "subSector": ["Cementos", "Ceramica y Otros Materiales", "Construccion", "Distribucion de materiales", "Infraestructura", "Infraestructura Vial", "Ingenieria Civil", "Preparacion de Terreno"] },
    { "Nombre": "Financiero", "subSector": ["Banca", "Cajeros Electrónicos", "Compañias de Financiamiento", "Compañias de Leasing", "Corporaciones de Ahorro", "Corredores de Bolsa", "Fiduciaria", "Fondo de Pensiones", "Servicios Financieros", "Tarjeta de Crédito"] },
    { "Nombre": "Servicios", "subSector": ["Alimentos - Bebidas", "Almacenes de Depósito", "Cajas de Compensacion", "Clubes", "Cooperativas", "Correo", "Hoteles", "Informáticos", "Otros Servicios", "Restaurantes", "Servicios de Aseo", "Servicios Públicos", "Turismo", "Vigilancia y Seguridad"] },
    { "Nombre": "Agropecuario", "subSector": ["Agricultura y Varios", "Avícola", "Café Producción", "Distribucion de Productos", "Flores", "Ganadería", "Pesca"] },
    { "Nombre": "Asegurador", "subSector": ["Ajustadores de Seguros", "Compañias de Seguros", "Corredores de Seguros", "Reaseguradores"] },
    { "Nombre": "Bebidas y Tabaco", "subSector": ["Cerveza", "Distribucion / Consumo Masivo", "Gaseosas, Jugos y Agua", "Licores", "Tabaco"] },
    { "Nombre": "Consultorias / Asesorias", "subSector": ["Consultoría Contable", "Consultoría de Recursos Humanos", "Firmas de Abogados", "Firmas de Consultoria Empresarial", "Temporales / Dotación"] },
    { "Nombre": "Consumo masivo", "subSector": ["Consumo masivo"] },
    { "Nombre": "Cuero y Calzado", "subSector": ["Calzado", "Curtido de Cuero", "Maletas, Bolsos y Similares"] },
    { "Nombre": "Editorial e Impresión", "subSector": ["Impresion Editorial", "Libros y Folletos y Similares"] },
    { "Nombre": "Educativo", "subSector": ["Campañas de Capacitacion", "Colegios", "Institutos Técnicos", "Universidades"] },
    { "Nombre": "Energético", "subSector": ["Compañias Petroleras", "Distribucion de Carbon", "Distribución de Combustibles", "Energía Eléctrica", "Gas", "Servicios Petroleros"] },
    { "Nombre": "Entretenimiento", "subSector": ["Cine y Videos", "Otros", "Parques de Diversiones", "Produccion de Grabación"] },
    { "Nombre": "Investigación", "subSector": ["Varios"] },
    { "Nombre": "Manufactura", "subSector": ["Distribucion de Enseres Domiciliarios", "Distribucion de Maquinaria", "Electrodomésticos", "Manufacturas Varias", "Maquinaria y Equipo", "Muebles y Accesorios", "Productos de Madera"] },
    { "Nombre": "Medios", "subSector": ["Internet", "Periódicos", "Radio", "Revistas", "Televisión"] },
    { "Nombre": "Minería, Hierro, Acero y otros Materiales", "subSector": ["Metales Básicos, Hierro, Acero", "Metales no Ferroso", "Otros", "Productos de Metal", "Siderurgia"] },
    { "Nombre": "Naval", "subSector": ["Construccion Naval", "Diseño Naval", "Mantenimiento Naval", "Naval", "Reparacion Naval"] },
    { "Nombre": "Otra Actividad", "subSector": ["Atelier de diseño", "Otra Actividad"] },
    { "Nombre": "Plástico y Caucho", "subSector": ["Plasticos Primarios", "Productos de Caucho", "Productos de Plástico"] },
    { "Nombre": "Productos de Vidrio", "subSector": ["Envases", "Otros Productos de Vidrios", "Vidrio - Construccion", "Vidrio - Vehículo"] },
    { "Nombre": "Publicidad y Mercadeo", "subSector": ["Agencias de Publicidad", "Agencias Promocionales", "Brokers de Medios", "Correo Directo", "Otros", "Relaciones Públicas"] },
    { "Nombre": "Pulpa, Papel y Cartón", "subSector": ["Papel Celulosa y Carton", "Productos de Papel y Cartón"] },
    { "Nombre": "Quimicos", "subSector": ["Abonos, Plaguicidas y Químicos", "Distribucion / Consumo Masivo", "Distribucion de Productos", "Laboratorios Farmacéuticos", "Pinturas, Barnices y Similares", "Productos de Aseo y Comsméticos", "Quimicos Básicos", "Quimicos Industriales"] },
    { "Nombre": "Salud", "subSector": ["A.R.P", "E.P.S", "I.P.S", "Mediciona Prepagada", "Seguridad Social", "Servicios Hospitalarios"] },
    { "Nombre": "Tecnología", "subSector": ["Comercio de Computadores", "Desarrollo y Diseño de Paginas Web", "Productores y Distribuidores"] },
    { "Nombre": "Telecomunicaciones", "subSector": ["Celulares", "Equipos de Comunicación", "Otros", "Servicios de Comunicación"] },
    { "Nombre": "Textiles, Prendas de Vestir y Calzado", "subSector": ["Acabados Textiles", "Confecciones", "Distribución de Productos", "Hilanderas", "Textiles"] },
    { "Nombre": "Transporte", "subSector": ["Aéreo", "Agente", "Marítimo y Fluvial", "Operadores, Agentes y Terminales", "Valores"] },
    { "Nombre": "Vehiculos y Partes", "subSector": ["Academia Automovilística", "Carrocerías, Partes y Piezas", "Comercialización de Partes", "Concesionarios", "Emsambladoras de Vehículos", "Importadores de Vehículos", "Talleres"] }
  ];*/
  sectoresInteresEmpresa: ISector[] = []
  /*[
    { "Nombre": "Estatal y Relacionados", "subSectores": [{ "idSector": 0, "nombre": "Medio ambiente" }, { "idSector": 0, "nombre": "Minas y Energia" }] },
    { "Nombre": "Alimentos", "subSectores": [{ "idSector": 1, "nombre": "Azúcar" }] }
  ];*/
  debouncer: any;
  subSecEscogidos: ISubSector[] = [];
  anios: any[] = [];
  paises: Object;
  departamentos: Object;
  ciudades: Object;
  code: string;
  formRegistroEmp: FormGroup;
  isLinear = true;
  contOculto = true;
  mensajesError: String[] = [];
  constructor(
    private servGenerales: GeneralesService,
    private formBuilder: FormBuilder,
    private empService: EmpresaService,
    private matDialog: MatDialog,
    private router: Router,
  ) {
    this.formRegistroEmp = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: ['', [Validators.required, Validators.email], this.validarExistenciaEmail.bind(this)],
        contrasenia: ['', [Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$")]],
        captchaDigitado: ['']
      }),
      'datos-generales-empresa': this.formBuilder.group({
        NIT: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)], this.validarExistenciaNIT.bind(this)],
        razonSocial: [null, Validators.required],
        nombreEmpresa: [null, Validators.required],
        anioCreacion: [null, Validators.required],
        numEmpleados: [null, [Validators.required, Validators.min(0)]],
        ingresosEmp: [null],
        descripcionEmpresa: [null, Validators.required]
      }),
      'sectores': this.formBuilder.group({
        sectores: [[], [Validators.required, this.sectorValidator]],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        paisEmp: [null, Validators.required],
        departamentoEmp: [null, Validators.required],
        ciudadEmp: [null, Validators.required],
        direccionEmp: [null, Validators.required],
        barrioEmp: [null, Validators.required],
        codigoPostalEmp: [null, Validators.min(0)],
        telefonoEmp: [null, [Validators.required, Validators.min(0)]],
        emailEmp: [null, [Validators.email]],
        sitioWebEmp: [null]
        //sitioWebEmp: [null, Validators.pattern("^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$")]
      }),
      'datos-resp': this.formBuilder.group({
        nombrereplegal: [null, Validators.required],
        apellidoreplegal: [null, Validators.required],
        telefonoreplegal: [null, Validators.min(0)],
        telefonoMovilreplegal: [null, [Validators.required, Validators.min(0)]],
        nombreResp: [null, Validators.required],
        apellidoResp: [null, Validators.required],
        cargo: [null, Validators.required], //se recibe de la base de datos
        telefonoResp: [null, Validators.min(0)],
        telefonoMovilResp: [null, [Validators.required, Validators.min(0)]],
        horarioContactoResp: [null],
        direccionTrabajoResp: [null, Validators.required],
        emailCorpResp: [null, [Validators.required, Validators.email]]
      })
    });
  }

  ngOnInit() {
    this.cargarPaises();
    this.cargarAnios();
    this.cargarSectoresInteres();
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
      console.log(resultado);
      this.sectoresInteresEmpresa = resultado;
    },
      error => {
        console.log("Error al obtener los Sectores: ", JSON.stringify(error));
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
      alert('Captcha invalido');
    }
  }
  /**
   * Manda el formulario de registro a los servicios de la empresa
   * encargados de las peticiones.
   * <p>
   * Si existe un error al cargarlo imprime en la consola el error
   * @param  formulario  Id del pais escogido en la lista de departamentos
   */
  registrarEmpresa(formulario) {
    console.log('formulario', formulario);
    this.empService.registrarUsuario(formulario.value).toPromise().then(data => {
      console.log(data);
      this.openDialog();
    },
      errorRegistro => {
        this.mensajesError = [];
        alert("Error en la peticion al servidor, por favor intentelo de nuevo");
        console.log(errorRegistro);
        console.log(errorRegistro.error);
        // Obteniendo todas las claves del JSON
        for (var clave in errorRegistro.error) {
          // Controlando que json realmente tenga esa propiedad
          if (errorRegistro.error.hasOwnProperty(clave)) {
            // Mostrando en pantalla la clave junto a su valor
            this.mensajesError = errorRegistro.error[clave];
          }
        }
      });
  }
  /**
 * elimina un subSector escogido a partir de la lista de sectores en el formulario de registro
 * se elimina de la lista subSecEscogidos y se actualiza en la lista sectores del ngForm
 * <p>
 * Se busca en la lista de escogidos
 * @param  subSector  objeto subSector que contiene { idSector: number; nombre: string; }
 */
  eliminarSubSectorEscogido(subSector: ISubSector) {
    //Se busca en la lista de escogidos
    let posSubSector = this.subSecEscogidos.indexOf(subSector);
    //Se elimina en la lista de escogidos
    this.subSecEscogidos.splice(posSubSector, 1);
    //Se busca en la lista general
    posSubSector = this.sectoresInteresEmpresa[subSector.idSector].subSectores.indexOf(subSector);
    //Se devuelve a la lista general
    this.sectoresInteresEmpresa[subSector.idSector].subSectores.push(subSector);
    //Se iguala nuevamente el valor del formControl
    this.formRegistroEmp.controls['sectores'].get('sectores').setValue(this.subSecEscogidos);
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
    //se elimina en sector de la lista general
    this.sectoresInteresEmpresa[posSector].subSectores.splice(posSubSector, 1);
    //Se el subsector a la lista de escogidos
    this.subSecEscogidos.push(subSector);
    //Se actualiza el valor del formControl
    this.formRegistroEmp.controls['sectores'].get('sectores').setValue(this.subSecEscogidos);
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
            console.log(err);
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
            if (res !== control.value) {
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

  NitLengthValidator(control: FormControl) {
    //Si la lista esta vacia se invalida
    if (control.value.length < 4) {
      return true;
    }
    //En caso contrario se deja pasar
    return null;
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
      this.router.navigate(['/']);
    });
  }
}
