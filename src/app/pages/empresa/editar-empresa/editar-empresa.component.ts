import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISector } from '../../../shared/modelos/sectorInterface'
import { ISubSector } from '../../../shared/modelos/subSectorInterface'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { MatDialog } from '@angular/material';
import { DialogFinalRegistroComponent } from '../dialog-final-registro/dialog-final-registro.component';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {
  sectoresInteresEmpresa: ISector[] = [
    { "Nombre": "Estatal y Relacionados", "subSectores": [{ "idSector": 0, "nombre": "Medio ambiente" }, { "idSector": 0, "nombre": "Minas y Energia" }] },
    { "Nombre": "Alimentos", "subSectores": [{ "idSector": 1, "nombre": "Azúcar" }] }
  ];
  debouncer: any;
  subSecEscogidos: ISubSector[] = [];
  anios: any[] = [];
  paises: Object;
  departamentos: Object;
  ciudades: Object;
  code: string;
  formModificarEmp: FormGroup;
  isLinear = true;
  contOculto = true;
  
  constructor(
    private servGenerales: GeneralesService,
    private formBuilder: FormBuilder,
    private empService: EmpresaService,
    private matDialog: MatDialog,
    private router: Router,
  ) {
   /* this.empService.getDatos()
    .subscribe(data => {
      //this.data = data;
      //console.log(data);
      this.formModificarEmp = this.formBuilder.group({
        'datos-cuenta': this.formBuilder.group({
          email: ['', [Validators.required, Validators.email, this.validarExistenciaEmail.bind(this)]],
          //email: ['', [Validators.required, Validators.email]],
          contrasenia: ['', Validators.required],
        }),
        'datos-genersales-empresa': this.formBuilder.group({
          //NIT: ['', [Validators.required, Validators.minLength(8), this.validarExistenciaNIT.bind(this)]],
          NIT: ['', [Validators.required, Validators.minLength(8)]],
          razonSocial: ['', Validators.required],
          nombreEmpresa: ['', Validators.required],
          anioCreacion: ['', Validators.required],
          numEmpleados: ['', Validators.required],
          ingresosEmp: [''],
          descripcionEmpresa: ['', Validators.required]
        }),
        'sectores': this.formBuilder.group({
          sectores: [[], [Validators.required, this.sectorValidator]],
        }),
        'loc-contact-empresa': this.formBuilder.group({
          paisEmp: ['', [Validators.required]],
          departamentoEmp: ['', Validators.required],
          ciudadEmp: ['', Validators.required],
          direccionEmp: ['', Validators.required],
          barrioEmp: ['', Validators.required],
          codigoPostalEmp: [''],
          telefonoEmp: ['', Validators.required],
          emailEmp: ['', [Validators.email]],
          sitioWebEmp: ['']
        }),
        'datos-resp': this.formBuilder.group({
          nombrereplegal: ['', Validators.required],
          apellidoreplegal: ['', Validators.required],
          telefonoreplegal: [''],
          telefonoMovilreplegal: ['', Validators.required],
          nombreResp: ['', Validators.required],
          apellidoResp: ['', Validators.required],
          cargoResp: ['', Validators.required], //se recibe de la base de datos
          telefonoResp: [''],
          telefonoMovilResp: ['', Validators.required],
          horarioContactoResp: [''],
          direccionTrabajoResp: ['', Validators.required],
          emailCorpResp: ['', [Validators.required, Validators.email]]
        })
      });
    
    }),
    error => console.log(error); */
    this.formModificarEmp = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, this.validarExistenciaEmail.bind(this)]],
        //email: ['', [Validators.required, Validators.email]],
        contrasenia: ['', Validators.required],
      }),
      'datos-genersales-empresa': this.formBuilder.group({
        //NIT: ['', [Validators.required, Validators.minLength(8), this.validarExistenciaNIT.bind(this)]],
        NIT: ['', [Validators.required, Validators.minLength(8)]],
        razonSocial: ['', Validators.required],
        nombreEmpresa: ['', Validators.required],
        anioCreacion: ['', Validators.required],
        numEmpleados: ['', Validators.required],
        ingresosEmp: [''],
        descripcionEmpresa: ['', Validators.required]
      }),
      'sectores': this.formBuilder.group({
        sectores: [[], [Validators.required, this.sectorValidator]],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        paisEmp: ['', [Validators.required]],
        departamentoEmp: ['', Validators.required],
        ciudadEmp: ['', Validators.required],
        direccionEmp: ['', Validators.required],
        barrioEmp: ['', Validators.required],
        codigoPostalEmp: [''],
        telefonoEmp: ['', Validators.required],
        emailEmp: ['', [Validators.email]],
        sitioWebEmp: ['']
      }),
      'datos-resp': this.formBuilder.group({
        nombrereplegal: ['', Validators.required],
        apellidoreplegal: ['', Validators.required],
        telefonoreplegal: [''],
        telefonoMovilreplegal: ['', Validators.required],
        nombreResp: ['', Validators.required],
        apellidoResp: ['', Validators.required],
        cargoResp: ['', Validators.required], //se recibe de la base de datos
        telefonoResp: [''],
        telefonoMovilResp: ['', Validators.required],
        horarioContactoResp: [''],
        direccionTrabajoResp: ['', Validators.required],
        emailCorpResp: ['', [Validators.required, Validators.email]]
      })
    });
  }

  ngOnInit() {
    this.cargarPaises();
    this.cargarAnios();
  }
  /**
 * Carga la lista paises, envia al servicio general encargado
 * de realizar las peticiones
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 */
  cargarPaises() {
    this.servGenerales.obtenerListaPaises().subscribe(resultado => {
      this.paises = resultado.countries;
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
      this.departamentos = resultado.states.filter(item => item.country_id == idPais);
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
      this.ciudades = resultado.cities.filter(item => item.state_id == idDepartamento);
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
      this.sectoresInteresEmpresa = resultado;
    },
      error => {
        console.log("Error al obtener los Sectores: ", JSON.stringify(error));
      });
  }


/**
 * Manda el formulario de modificar a los servicios de la empresa
 * encargados de las peticiones.
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 * @param  formulario  Id del pais escogido en la lista de departamentos
 */
  modificarEmpresa(formulario) {
    console.log('formulario', formulario);
    this.empService.modificarEmpresa(formulario.value).toPromise().then(data => {
      console.log(data);
      this.openDialog();
    },
      error => {
        alert("Error en la peticion al servidor, por favor intentelo de nuevo");
        console.log(error);
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
    this.formModificarEmp.controls['sectores'].get('sectores').setValue(this.subSecEscogidos);
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
    this.formModificarEmp.controls['sectores'].get('sectores').setValue(this.subSecEscogidos);
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
    //Si la lista esta vacia se invalida
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

      this.debouncer = setTimeout(() => {

        this.servGenerales.validarEmail(control.value).subscribe((res) => {
          if (res !== control.value) {
            resolve(null);
          }
        }, (err) => {
          resolve({ 'EmailExiste': true });
        });

      }, 1000);
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

      this.debouncer = setTimeout(() => {

        this.servGenerales.validarNIT(control.value).subscribe((res) => {
          if (res !== control.value) {
            resolve(null);
          }
        }, (err) => {
          resolve({ 'NITExiste': true });
        });

      }, 1000);
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
      this.router.navigate(['/datosEmpresa']);
    });
  }
}
