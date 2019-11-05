import { Component, OnInit ,Inject} from '@angular/core';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ISector } from '../../../shared/modelos/sectorInterface'
import { ISubSector } from '../../../shared/modelos/subSectorInterface'
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  data = 'a';
  emailInicial:String ;
  sectoresInteresEmpresa: ISector[] = [];
  
  sectoresUsuario: ISector[];
  id: string;
  debouncer: any;
  subSecEscogidos: ISubSector[] = [];
  anios: any[] = [];
  paises: Object;
  departamentos: Object;
  ciudades: Object;
  code: string;
  formDatosEmpresa: FormGroup;
  isLinear = true;
  contOculto = true;
  mensajesError: String[] = [];
  constructor(
    private servGenerales: GeneralesService,
    private formBuilder: FormBuilder,
    private empService: EmpresaService,
    private matDialog: MatDialog,
    private router: Router,
    private empresaService : EmpresaService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,

  ) {
    this.formDatosEmpresa = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: ['', [Validators.required, Validators.email], this.validarExistenciaEmail.bind(this)],
      }),
      'datos-generales-empresa': this.formBuilder.group({
        NIT: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
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
        idPais :[null, Validators.required],
        paisEmp: [null,Validators.required],
        idDepartamento :['', Validators.required],
        departamentoEmp: [null, Validators.required],
        idCiudad :['', Validators.required],
        ciudadEmp: [null, Validators.required],
        direccionEmp: [null, Validators.required],
        barrioEmp: [null, Validators.required],
        codigoPostalEmp: [null, Validators.min(0)],
        telefonoEmp: [null],
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
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarSectoresInteres();
    this.empresaService.getDatos()
    .subscribe(data => {
      // obtener la data y pasarla al form
      this.formDatosEmpresa.controls['datos-cuenta'].get('email').setValue(data.administrador.user.email);
      this.emailInicial = this.formDatosEmpresa.controls['datos-cuenta'].get('email').value;
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('NIT').setValue(data.nit);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('razonSocial').setValue(data.razon_social);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('nombreEmpresa').setValue(data.nombre);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('anioCreacion').setValue(data.anio_creacion);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('numEmpleados').setValue(data.numero_empleados);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('ingresosEmp').setValue('0-3.000.000');
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('descripcionEmpresa').setValue('FALTA');      
      this.formDatosEmpresa.controls['sectores'].get('sectores').setValue(data.sectores);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idPais').setValue(data.direccion.ciudad.departamento.pais.id_aut_pais);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('paisEmp').setValue(data.direccion.ciudad.departamento.pais.nombre);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idDepartamento').setValue(data.direccion.ciudad.departamento.id_aut_dep);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('departamentoEmp').setValue(data.direccion.ciudad.departamento.nombre);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idCiudad').setValue(data.direccion.ciudad.id_aut_ciudad);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('ciudadEmp').setValue(data.direccion.ciudad.nombre);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('direccionEmp').setValue(data.direccion.direccion);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('barrioEmp').setValue(data.direccion.barrio);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('codigoPostalEmp').setValue(data.direccion.codigo_postal);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('telefonoEmp').setValue(data.telefono);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('emailEmp').setValue(data.correo);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('sitioWebEmp').setValue(data.sitio_web);
      this.formDatosEmpresa.controls['datos-resp'].get('nombrereplegal').setValue(data.representante.nombre);
      this.formDatosEmpresa.controls['datos-resp'].get('apellidoreplegal').setValue(data.representante.apellidos);
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoreplegal').setValue(data.representante.telefono);
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoMovilreplegal').setValue(data.representante.telefono_movil);
      this.formDatosEmpresa.controls['datos-resp'].get('nombreResp').setValue(data.administrador.nombres);
      this.formDatosEmpresa.controls['datos-resp'].get('apellidoResp').setValue(data.administrador.apellidos);
      this.formDatosEmpresa.controls['datos-resp'].get('cargo').setValue(data.administrador.cargo.nombre);
      this.formDatosEmpresa.controls['datos-resp'].get('horarioContactoResp').setValue(data.administrador.horario_contacto);
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoResp').setValue(data.administrador.telefono);
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoMovilResp').setValue(data.administrador.telefono_movil);
      this.formDatosEmpresa.controls['datos-resp'].get('direccionTrabajoResp').setValue(data.administrador.direccion.direccion);
      this.formDatosEmpresa.controls['datos-resp'].get('emailCorpResp').setValue(data.administrador.correo_corporativo);     
      if((<HTMLInputElement>document.getElementById('select'))!=null)
      {
        let ingresos = this.formDatosEmpresa.controls['datos-generales-empresa'].get('ingresosEmp').value;
        (<HTMLInputElement>document.getElementById('select')).value= ingresos
      }
      let infoSectores:any[];
      infoSectores = this.formDatosEmpresa.controls['sectores'].get('sectores').value;
      for (let i = 0; i < infoSectores.length; i++) {
        for(let j=0; j< this.sectoresInteresEmpresa.length;j++){        
        if(infoSectores[i].nombre ==  this.sectoresInteresEmpresa[j].Nombre)
        {
          let lenSubsectores = infoSectores[i].subSectores.length;
          let subSectores = [];
          for(let k=0; k<lenSubsectores;k++){
            let subSector = <ISubSector> {idSector: infoSectores[i].subSectores[k].id_sectores,nombre: infoSectores[i].subSectores[k].nombre }
            //Se busca la posicion del subSector en la lista de general
            const posSubSector = this.sectoresInteresEmpresa[j].subSectores.findIndex( ISubSector => ISubSector.nombre === subSector.nombre);
            //se elimina en sector de la lista general
            this.sectoresInteresEmpresa[j].subSectores.splice(posSubSector, 1);
            //Se el subsector a la lista de escogidos
            this.subSecEscogidos.push(subSector);
            //Se actualiza el valor del formControl
            subSectores.push(subSector);
            this.formDatosEmpresa.controls['sectores'].get('sectores').setValue(this.subSecEscogidos);
          }
          this.sectoresUsuario.push(<ISector>{Nombre: infoSectores[i].nombre , subSectores: subSectores });
          break;
        }
      }
    }
    }),
    error => console.log(error);
    /*
    this.formDatosEmpresa.controls['datos-cuenta'].get('email').setValue('a@gmail.com');
    this.emailInicial = this.formDatosEmpresa.controls['datos-cuenta'].get('email').value;
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('NIT').setValue('123456789');
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('razonSocial').setValue(this.data);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('nombreEmpresa').setValue(this.data);
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('anioCreacion').setValue('1998');
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('numEmpleados').setValue('1998');
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('ingresosEmp').setValue('0-3.000.000');
      this.formDatosEmpresa.controls['datos-generales-empresa'].get('descripcionEmpresa').setValue('FALTA');      
      this.formDatosEmpresa.controls['sectores'].get('sectores').setValue(this.sectoresInteresEmpresa);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idPais').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('paisEmp').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idDepartamento').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('departamentoEmp').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('idCiudad').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('ciudadEmp').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('direccionEmp').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('barrioEmp').setValue(this.data);
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('codigoPostalEmp').setValue('19981');
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('telefonoEmp').setValue('1998');
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('emailEmp').setValue('a@gmail.com');
      this.formDatosEmpresa.controls['loc-contact-empresa'].get('sitioWebEmp').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('nombrereplegal').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('apellidoreplegal').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoreplegal').setValue('1998');
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoMovilreplegal').setValue('1998');
      this.formDatosEmpresa.controls['datos-resp'].get('nombreResp').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('apellidoResp').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('cargo').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('horarioContactoResp').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoResp').setValue('1998');
      this.formDatosEmpresa.controls['datos-resp'].get('telefonoMovilResp').setValue('1998');
      this.formDatosEmpresa.controls['datos-resp'].get('direccionTrabajoResp').setValue(this.data);
      this.formDatosEmpresa.controls['datos-resp'].get('emailCorpResp').setValue('a@gmail.com');
      let ingresos = this.formDatosEmpresa.controls['datos-generales-empresa'].get('ingresosEmp').value;
      if((<HTMLInputElement>document.getElementById('select'))!=null)
      {
        (<HTMLInputElement>document.getElementById('select')).value= ingresos
      }
      /* 
    let infoSectores:any[];
    infoSectores = this.formDatosEmpresa.controls['sectores'].get('sectores').value;
    console.log(infoSectores);
     infoSectores =  [
       { "nombre": "Estatal y Relacionados", "subSectores": [{ "id_sectores": 0, "nombre": "Medio ambiente" }, { "id_sectores": 0, "nombre": "Minas y Energia" }] },
        { "nombre": "Alimentos", "subSectores": [{ "id_sectores": 1, "nombre": "Azúcar" }] }
      ];
      for (let i = 0; i < infoSectores.length; i++) {
        for(let j=0; j< this.sectoresInteresEmpresa.length;j++){        
        if(infoSectores[i].nombre ==  this.sectoresInteresEmpresa[j].Nombre)
        {
          let lenSubsectores = infoSectores[i].subSectores.length;
          for(let k=0; k<lenSubsectores;k++){
            let subSector = <ISubSector> {idSector: infoSectores[i].subSectores[k].id_sectores,nombre: infoSectores[i].subSectores[k].nombre }
            //Se busca la posicion del subSector en la lista de general
            const posSubSector = this.sectoresInteresEmpresa[j].subSectores.findIndex( ISubSector => ISubSector.nombre === subSector.nombre);
            //se elimina en sector de la lista general
            this.sectoresInteresEmpresa[j].subSectores.splice(posSubSector, 1);
            //Se el subsector a la lista de escogidos
            this.subSecEscogidos.push(subSector);
            //Se actualiza el valor del formControl
            this.formDatosEmpresa.controls['sectores'].get('sectores').setValue(this.subSecEscogidos);
          }
          break;
        }
      }
    }
    */
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

 
  
  registrarEmpresa(formulario) {
    
    console.log(formulario);
    if(formulario.status != 'INVALID'){
      this.empService.modificarEmpresa(formulario.value).toPromise().then(data => {
        console.log(data);
        alert('Datos modificados exitosamente');
        this.router.navigate(['/datosEmpresa']);
  
        //this.openDialog();
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
    else{
      alert('datos incorrectos, por favor llenar los datos en los formatos validos');
    }
  }
  /**
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
    this.formDatosEmpresa.controls['sectores'].get('sectores').setValue(this.formatSectoresEscogidos());
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
  this.formDatosEmpresa.controls['sectores'].get('sectores').setValue(this.formatSectoresEscogidos());
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
  cancelarModificar(){
    const url = 'empresa/' + this.id + '/datosEmpresa';
    this.router.navigate([url]); 
   }


  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      height: '500px',
      data: {name: 'a', animal: 'a'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.html',
})
export class Dialog {

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}