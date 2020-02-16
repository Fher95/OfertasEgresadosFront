import { Component, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ISector } from '../../../shared/modelos/sectorInterface'
import { ISubSector } from '../../../shared/modelos/subSectorInterface'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';
import { ICargo } from 'src/app/shared/modelos/cargoInterface';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {
  showSpinner = true; //Determina cuando se muestra el spinner
  sectores: ISector[] =[] //Sectores cargados de la bd
  emailInicial:String //Email de la cuenta;
  sectoresInteresEmpresa = [] //Sectores a guardar;
  cargos: ICargo[] //Cargos de la BD;
  id: string //Id de la empresa;
  debouncer: any //Almacena el tiempo para la verificacion de email;
  subSecEscogidos: ISubSector[] = []; //Subsectores a guardar;
  anios: any[] = []; //Cantidad de años
  paises: Object; //Paises de la bd
  departamentos: Object; //Departamentos de la bd
  ciudades: Object; //Ciudades de la bd
  formDatosEmpresa: FormGroup; //Formulario de la modificacion de la empresa
  mensajesError: String[] = []; //Guarda los mensajes de error de los datos
  constructor(
    private servGenerales: GeneralesService,
    private formBuilder: FormBuilder,
    private empService: EmpresaService,
    private router: Router,
    private empresaService : EmpresaService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService
  ) {
    this.cargos = [ ];
    this.sectoresInteresEmpresa = [];
    //Formulario de la modificacion de la empresa
    this.formDatosEmpresa = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: ['', [Validators.required, Validators.email], this.validarExistenciaEmail.bind(this)],
      }),
      'datos-generales-empresa': this.formBuilder.group({
        NIT: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        razonSocial: [null, Validators.required],
        nombreEmpresa: [null, Validators.required],
        anioCreacion: [null, Validators.required],
        numEmpleados: [null, [Validators.required]],
        ingresosEmp: [null],
        descripcionEmpresa: [null, Validators.required]
      }),
      'sectores': this.formBuilder.group({
        subsectores: [[], [Validators.required, this.sectorValidator]],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        idPais :[null, Validators.required],
        paisEmp: [null,Validators.required],
        idDepartamento :['', Validators.required],
        departamentoEmp: [null, Validators.required],
        idCiudad :['', Validators.required],
        ciudadEmp: [null, Validators.required],
        direccionEmp: [null, Validators.required],
        barrioEmp: [null, Validators.required],
        codigoPostalEmp: ['', Validators.min(0)],
        telefonoEmp: [''],
        emailEmp: ['', [Validators.email]],
        sitioWebEmp: ['']
      }),
      'datos-resp': this.formBuilder.group({
        nombrereplegal: [null, Validators.required],
        apellidoreplegal: [null, Validators.required],
        telefonoreplegal: ['', Validators.min(0)],
        telefonoMovilreplegal: [null, [Validators.required, Validators.min(0)]],
        nombreResp: [null, Validators.required],
        apellidoResp: [null, Validators.required],
        cargo: [null, Validators.required], //se recibe de la base de datos
        telefonoResp: ['', Validators.min(0)],
        telefonoMovilResp: [null, [Validators.required, Validators.min(0)]],
        horarioContactoResp: [''],
        direccionTrabajoResp: [null, Validators.required],
        emailCorpResp: [null, [Validators.required, Validators.email]]
      })
    });
  }
  //Inicializa la informacion
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); //Obtiene el id de la empresa
    this.cargarCargos(); 
    // obtiene la informacion de la empresa y pasarla al form
    this.empresaService.getDatos(this.id)
    .subscribe(data => {
      this.formDatosEmpresa.controls['datos-cuenta'].get('email').setValue(data.administrador.user.email);
      this.emailInicial = this.formDatosEmpresa.controls['datos-cuenta'].get('email').value;
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('NIT').setValue(data.nit);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('razonSocial').setValue(data.razon_social);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('nombreEmpresa').setValue(data.nombre);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('anioCreacion').setValue(data.anio_creacion);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('numEmpleados').setValue(data.numero_empleados);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('ingresosEmp').setValue(data.ingresos);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('descripcionEmpresa').setValue(data.descripcion);
      this.formDatosEmpresa.controls['sectores'].get('subsectores').setValue(data.sectores);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idPais').setValue(data.direccion.ciudad.departamento.pais.id_aut_pais);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('paisEmp').setValue(data.direccion.ciudad.departamento.pais.nombre);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idDepartamento').setValue(data.direccion.ciudad.departamento.id_aut_dep);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('departamentoEmp').setValue(data.direccion.ciudad.departamento.nombre);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idCiudad').setValue(data.direccion.ciudad.id_aut_ciudad);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('ciudadEmp').setValue(data.direccion.ciudad.nombre);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('direccionEmp').setValue(data.direccion.direccion);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('barrioEmp').setValue(data.direccion.barrio);
        if(data.direccion.codigo_postal == null){
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('codigoPostalEmp').setValue('');
        }
        else{
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('codigoPostalEmp').setValue(data.direccion.codigo_postal);
        }
        if(data.telefono == null){
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('telefonoEmp').setValue('');
        }
        else{
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('telefonoEmp').setValue(data.telefono);
        }
        if(data.correo == null){
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('emailEmp').setValue('');
        }
        else{
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('emailEmp').setValue(data.correo);
        }
        if(data.sitio_web == null){
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('sitioWebEmp').setValue('');
        }
        else{
          this.formDatosEmpresa.controls['loc-contact-empresa'].get('sitioWebEmp').setValue(data.sitio_web);
        }
      this.formDatosEmpresa.controls['datos-resp'].get('nombrereplegal').setValue(data.representante.nombre);
      this.formDatosEmpresa.controls['datos-resp'].get('apellidoreplegal').setValue(data.representante.apellidos);
      if(data.representante.telefono == null){
        this.formDatosEmpresa.controls['datos-resp'].get('telefonoreplegal').setValue('');
      }
      else{
        this.formDatosEmpresa.controls['datos-resp'].get('telefonoreplegal').setValue(data.representante.telefono);
      }
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoMovilreplegal').setValue(data.representante.telefono_movil);
      this.formDatosEmpresa.controls['datos-resp'].get('nombreResp').setValue(data.administrador.nombres);
      this.formDatosEmpresa.controls['datos-resp'].get('apellidoResp').setValue(data.administrador.apellidos);
      this.formDatosEmpresa.controls['datos-resp'].get('cargo').setValue(data.administrador.cargo.nombre);
      if(data.administrador.horario_contacto == null){
        this.formDatosEmpresa.controls['datos-resp'].get('horarioContactoResp').setValue('');
      }
      else{
        this.formDatosEmpresa.controls['datos-resp'].get('horarioContactoResp').setValue(data.administrador.horario_contacto);
      }
      if(data.administrador.telefono == null){
        this.formDatosEmpresa.controls['datos-resp'].get('telefonoResp').setValue('');
      }
      else{
        this.formDatosEmpresa.controls['datos-resp'].get('telefonoResp').setValue(data.administrador.telefono);
      }
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoMovilResp').setValue(data.administrador.telefono_movil);
      this.formDatosEmpresa.controls['datos-resp'].get('direccionTrabajoResp').setValue(data.administrador.direccion.direccion);
      this.formDatosEmpresa.controls['datos-resp'].get('emailCorpResp').setValue(data.administrador.correo_corporativo);
      //Selecciona la opcion de los ingresos guardados por la empresa
      if((<HTMLInputElement>document.getElementById('selectIngresos'))!=null)
      {
        let ingresos = this.formDatosEmpresa.controls['datos-generales-empresa'].get('ingresosEmp').value;
        (<HTMLInputElement>document.getElementById('selectIngresos')).value= ingresos
      }
      //Selecciona la opcion del cargo guardado por la empresa
      if((<HTMLInputElement>document.getElementById('selectCargo'))!=null)
      {
        let cargo = this.formDatosEmpresa.controls['datos-resp'].get('cargo').value;
        (<HTMLInputElement>document.getElementById('selectCargo')).value= cargo
      }
      this.cargarSectoresInteres();
      this.showSpinner = false; //Cierra el spinner
    }),
    error =>{
    this.showSpinner = false; //Cierra el spinner
    this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde")
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
    let infoSectores:any[];
        infoSectores = this.formDatosEmpresa.controls['sectores'].get('subsectores').value;
          for (let i = 0; i < infoSectores.length; i++) {
            for(let j=0; j< this.sectoresInteresEmpresa.length;j++){
            if(infoSectores[i].nombre ==  this.sectoresInteresEmpresa[j].Nombre)
            {
              let lenSubsectores = infoSectores[i].subSectores.length;
              for(let k=0; k<lenSubsectores;k++){
                let subSector = <ISubSector> {idSubSector: infoSectores[i].subSectores[k].id_aut_sub_sector,Nombre: infoSectores[i].subSectores[k].nombre, idSector : infoSectores[i].subSectores[k].id_sectores}
                //Se busca la posicion del subSector en la lista de general
                const posSubSector = this.sectoresInteresEmpresa[j].subSectores.findIndex( ISubSector => ISubSector.Nombre == subSector.Nombre);
                //se elimina en sector de la lista general

                this.sectoresInteresEmpresa[j].subSectores.splice(posSubSector, 1);
                //Se el subsector a la lista de escogidos
                this.subSecEscogidos.push(subSector);
                //Se actualiza el valor del formControl
                this.formDatosEmpresa.controls['sectores'].get('subsectores').setValue(this.formatSectoresEscogidos());
              }
              break;
            }
          }
        }
  },
    error => {
      this.showSpinner = false;
      this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
    });
}
 /**
 * Carga la lista cargos mediante una peticion al back
 * [{id_aut_cargos:1, nombre:"Docente", estado:"true"}, ...]
 * <p>
 * Si existe un error al cargarlo imprime en la consola el error
 */
cargarCargos() {
  this.servGenerales.obtenerListaCargos().subscribe(resultado => {
    this.cargos = resultado;
  },
    error => {
      this.showSpinner = false;
      this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
    
    });
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
   //Se busca en la lista de escogidos
   let posSubSector = this.subSecEscogidos.indexOf(subSector);
   //Se elimina en la lista de escogidos
   this.subSecEscogidos.splice(posSubSector, 1);
   //Se devuelve a la lista general
   this.sectoresInteresEmpresa[subSector.idSector - 1].subSectores.push(subSector);
   //Se iguala nuevamente el valor del formControl
   this.formDatosEmpresa.controls['sectores'].get('subsectores').setValue(this.formatSectoresEscogidos());
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
  this.formDatosEmpresa.controls['sectores'].get('subsectores').setValue(this.formatSectoresEscogidos());
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
          if(control.value == this.emailInicial){
            resolve(null);
          }
          else{
          this.empService.validarEmail(control.value).subscribe((res) => {
            if (res == 'Correcto') {
              resolve(null);
            }
            else {
              resolve({ 'EmailExiste': true });
            }
          }, (err) => {
            resolve({ 'EmailExiste': true });
          });}
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
          this.empService.validarNIT(control.value).subscribe((res) => {
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
  // Valida el nit de la empresa
  NitLengthValidator(control: FormControl) {
    //Si la lista esta vacia se invalida
    if (control.value.length < 4) {
      return true;
    }
    //En caso contrario se deja pasar
    return null;
  }
 
  //Manda la peticion de modificacion a la empresa
  modificarEmpresa(formulario) {
    if(formulario.status != 'INVALID'){
      this.empService.modificarEmpresa(this.id,formulario.value).toPromise().then(data => {
        this.alert.showSuccesMessage('Exito','Se ha modificado la empresa exitosamente')
        .then((value) => {
          this.router.navigate(['empresa/'+this.id+'/datosEmpresa']);
        });
      },
        errorRegistro => {
          this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        });
    }
    else{
      this.alert.showErrorMessage('Datos incorrectos','Por favor verique que todos los datos esten ingresados correctamente')
    }
  }
  //Retorna a los datos de la empresa
  cancelarModificar(){
    const url = 'empresa/' + this.id + '/datosEmpresa';
    this.router.navigate([url]);
   } 
}

