import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogInfoOfertaComponent } from '../dialog-info-oferta/dialog-info-oferta.component';
import { MatDialog } from '@angular/material';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-modificar-oferta-laboral',
  templateUrl: './modificar-oferta-laboral.component.html',
  styleUrls: ['./modificar-oferta-laboral.component.css']
})
export class ModificarOfertaLaboralComponent implements OnInit {

  id: string; //Id de la empresa
  idOferta: string; //Id de la oferta
  idPaisColombia = "42"; //El id del  pais colombia en la BD
  showSpinner = true; //Determina cuando se muestra el spinner
  formOfertaLaboral: FormGroup; //Formulario de la oferta Laboral
  formIdioma:FormGroup; //Formulario para agregar un idioma
  formSoftware:FormGroup; //Forulario para agregar un software
  formPregunta:FormGroup; //Formulario para agregar una pregunta
  formUbicacion:FormGroup;
  idiomasEscogidos = [] //Guarda temporalmente los idiomas seleccionados
  softwaresEscogidos = [] //Guarda temporalmente los softwares seleccionados
  preguntasEscogidas = [] //Guarda temporalmente las preguntas seleccionados
  ubicacionesEscogidas = [] //Guarda temporalmente las ubicaciones seleccionados
  labelPosition = 'before'; //Posicion de los checkBox
  //Datos cargados de la BD
  cargos = []
  sectores = []
  estudiosMinimos = []
  areas = []
  programas = []
  discapacidades = [ ]
  idiomas = []
  ubicaciones = []
  rangosSalariales = []

datosFormChecked: FormGroup;
  constructor( private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private matDialog: MatDialog,
    private servGenerales: GeneralesService,private alert: AlertService,
    private empService: EmpresaService,    private router: Router,
    ) {
      //Form encargado de verificar si se desea crear idiomas,softwares, preguntas y discapacidades
      this.datosFormChecked = this.formBuilder.group({
        idiomaChecked: [false],
        softwareChecked: [false],
        preguntasChecked: [false],
        discapacidadChecked: [false]
      });
      //Formulario para agregar un idioma
      this.formIdioma = this.formBuilder.group({
        id:[null,Validators.required],
        nombre:[null],
        nivel_lectura:[null,Validators.required],
        nivel_escritura:[null,Validators.required],
        nivel_conversacion:[null,Validators.required]
      });
      //Formulario para agregar un software
      this.formSoftware = this.formBuilder.group({
        nombre:[null,Validators.required],
        nivel:[null,Validators.required]
      });
      //Formulario para agregar una pregunta
      this.formPregunta = this.formBuilder.group({
        pregunta:[null,Validators.required],
      });
      //Formulario para agregar una ubicacion
      this.formUbicacion = this.formBuilder.group({
        pais:['Colombia',Validators.required],
        departamento:[null,Validators.required],
        idCiudad:[null,Validators.required],
        ciudad:[null],
      });
      //Formulario de la oferta Laboral
      this.formOfertaLaboral = this.formBuilder.group({
        'informacionPrincipal': this.formBuilder.group({
          nombreOferta: [null, Validators.required],
          descripcion: [null, Validators.required],
          cargo:[null, Validators.required],
          numVacantes: [null, [Validators.required,Validators.min(1)]],
          sector:[null],
          idSector:[null, Validators.required],
          nombreTempEmpresa: [null],
          areas:[null],
          idAreasConocimiento:[null, Validators.required],
          vigenciaDias:[null,[Validators.required,Validators.min(0)]],
          ubicaciones:[],
          idUbicaciones:[[],Validators.required]
        }),
        'contrato':this.formBuilder.group({
          tipoContrato:[null, Validators.required],
          formaPago:[null,Validators.required],
          duracion:[null],
          horario:[null],
          jornada:[null, Validators.required],
          idRangoSalarial:[null,Validators.required],
          rangoSalarial:[null,],
          comentariosSalario:[null]
        }),
        'requisitos':this.formBuilder.group({
          perfil:[null,Validators.required],
          idEstudioMinimo:[null,Validators.required],
          estudioMinimo:[null],
          programas:[null],
          idProgramas:[null,Validators.required],
          anios:[null,[Validators.required,Validators.min(0)]],
          experienciaLaboral:[null,Validators.required],
          requisitosMinimos:[null,Validators.required],
          movilizacionPropia:[null,Validators.required],
          licenciaConduccion:[null],
          discapacidades:[null],
          idDiscapacidades:[null],
          idiomas:[[]],
          softwareOferta:[[]],
          preguntasCandidato:[[]]
        }),
        'contactoHV': this.formBuilder.group({
          correo:[null,[Validators.required,Validators.email]],
          nombres:[null,Validators.required],
          apellidos:[null,Validators.required],
          telefonoMovil:[null,Validators.required],
        })
      });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.idOferta = this.activatedRoute.snapshot.paramMap.get('idOferta');
    this.cargarCargos();
    this.cargarAreas();
    this.cargarSectores();
    this.cargarEstudiosMinimos();
    this.cargarProgramas();
    this.cargarIdiomas();
    this.cargarDiscapacidades();
    this.cargarUbicaciones();
    this.cargarContactoHv();
    this.cargarDatosOferta();
    this.showSpinner = false; //Cierra el spinner
  }
  //Carga todos los cargos de la BD
  cargarCargos(){
    this.servGenerales.obtenerListaCargos().subscribe(resultado => {
      this.cargos = resultado;
      console.log(this.cargos)
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los cargos: ", JSON.stringify(error));
      });
  }
  //Carga todas las areas de conocimiento de la BD
  cargarAreas(){
    this.empService.obtenerAreasConocimiento().subscribe(resultado => {
    this.areas = resultado;
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los cargos: ", JSON.stringify(error));
      });
  }
  //Carga todos los sectores de la BD
  cargarSectores(){
    this.servGenerales.obtenerListaSectores().subscribe(resultado => {
      this.sectores = resultado;
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los sectores: ", JSON.stringify(error));
      });
  }
  //Carga todos los estudios minimos de la BD
  cargarEstudiosMinimos(){
    this.empService.obtenerEstudiosMinimos().subscribe(resultado => {
      this.estudiosMinimos = resultado;
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los estudios minimos: ", JSON.stringify(error));
      });
  }
  //Carga todos los cargos de la BD
  cargarProgramas(){
    this.empService.obtenerProgramas().subscribe(resultado => {
      this.programas = resultado;
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los programas: ", JSON.stringify(error));
      });
  }
  //Carga todos los idiomas de la BD
  cargarIdiomas(){
    this.empService.obtenerIdiomas().subscribe(resultado => {
      this.idiomas = resultado;
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los idiomas: ", JSON.stringify(error));
      });
  }
  //Carga todos las discapacidades de la BD
  cargarDiscapacidades()
  {
    this.empService.obtenerDiscapacidades().subscribe(resultado => {
      this.discapacidades = resultado;
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener las discapacidades: ", JSON.stringify(error));
      });
  }
  //Carga todas los ubicaciones del pais
  cargarUbicaciones()
  {
    this.servGenerales.obtenerListaDepartamentosCiudades(this.idPaisColombia).subscribe(resultado => {
      this.ubicaciones = resultado;
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener las ubicaciones: ", JSON.stringify(error));
      });
  }
  //Carga los datos del contacto encargado de las HV
  cargarContactoHv()
  {
    this.empService.getDatosContactoHv(this.id).subscribe(resultado => {
      this.formOfertaLaboral.controls['contactoHV'].get('nombres').setValue(resultado.data.nombres)
      this.formOfertaLaboral.controls['contactoHV'].get('apellidos').setValue(resultado.data.apellidos)
      this.formOfertaLaboral.controls['contactoHV'].get('telefonoMovil').setValue(resultado.data.telefono_movil)
      this.formOfertaLaboral.controls['contactoHV'].get('correo').setValue(resultado.data.correo_corporativo)
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los datos de contacto: ", JSON.stringify(error));
      });
  }
  //Carga los datos de la oferta a modificar
  cargarDatosOferta()
  {
    this.empService.getDatosOferta(this.idOferta).subscribe(resultado => {
      this.formOfertaLaboral.setValue(resultado)
      this.idiomasEscogidos = this.formOfertaLaboral.controls['requisitos'].get('idiomas').value
      this.softwaresEscogidos = this.formOfertaLaboral.controls['requisitos'].get('softwareOferta').value
      this.preguntasEscogidas = this.formOfertaLaboral.controls['requisitos'].get('preguntasCandidato').value
      this.ubicacionesEscogidas = this.formOfertaLaboral.controls['informacionPrincipal'].get('ubicaciones').value
      /*
      this.formOfertaLaboral.controls['informacionPrincipal'].get('nombreOferta').setValue(resultado.informacionPrincipal.nombreOferta)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('descripcion').setValue(resultado.informacionPrincipal.descripcion)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('cargo').setValue(resultado.informacionPrincipal.cargo)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('numVacantes').setValue(resultado.informacionPrincipal.numVacantes)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('sector').setValue(resultado.informacionPrincipal.sector)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('idSector').setValue(resultado.informacionPrincipal.idSector)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('nombreTempEmpresa').setValue(resultado.informacionPrincipal.nombreTempEmpresa)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').setValue(resultado.informacionPrincipal.areas)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('idAreasConocimiento').setValue(resultado.informacionPrincipal.idAreasConocimiento)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('vigenciaDias').setValue(resultado.informacionPrincipal.vigenciaDias)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('ubicaciones').setValue(resultado.informacionPrincipal.ubicaciones)
      this.formOfertaLaboral.controls['informacionPrincipal'].get('idUbicaciones').setValue(resultado.informacionPrincipal.idUbicaciones)
      this.formOfertaLaboral.controls['contrato'].get('tipoContrato').setValue(resultado.contrato.tipoContrato)
      this.formOfertaLaboral.controls['contrato'].get('formaPago').setValue(resultado.contrato.formaPago)
      this.formOfertaLaboral.controls['contrato'].get('duracion').setValue(resultado.contrato.duracion)
      this.formOfertaLaboral.controls['contrato'].get('horario').setValue(resultado.contrato.horario)
      this.formOfertaLaboral.controls['contrato'].get('jornada').setValue(resultado.contrato.jornada)
      this.formOfertaLaboral.controls['contrato'].get('idRangoSalarial').setValue(resultado.contrato.idRangoSalarial)
      this.formOfertaLaboral.controls['contrato'].get('rangoSalarial').setValue(resultado.contrato.rangoSalarial)
      this.formOfertaLaboral.controls['contrato'].get('comentariosSalario').setValue(resultado.contrato.comentariosSalario)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)
      this.formOfertaLaboral.controls['contrato'].get('').setValue(resultado.contrato.)



      'requisitos':this.formBuilder.group({
        perfil:[null,Validators.required],
        idEstudioMinimo:[null,Validators.required],
        estudioMinimo:[null],
        programas:[null],
        idProgramas:[null,Validators.required],
        anios:[null,[Validators.required,Validators.min(0)]],
        experienciaLaboral:[null,Validators.required],
        requisitosMinimos:[null,Validators.required],
        movilizacionPropia:[null,Validators.required],
        licenciaConduccion:[null],
        discapacidades:[null],
        idDiscapacidades:[null],
        idiomas:[[]],
        softwareOferta:[[]],
        preguntasCandidato:[[]]
      }),
      'contactoHV': this.formBuilder.group({
        correo:[null,[Validators.required,Validators.email]],
        nombres:[null,Validators.required],
        apellidos:[null,Validators.required],
        telefonoMovil:[null,Validators.required],
      })*/
      
    },
      error => {
        this.showSpinner = false;
        this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
        console.log("Error al obtener los datos de la oferta: ", JSON.stringify(error));
      });
  }
  //Obtiene los rangos salariales dependiendo Si es en Dolares o Moneda Local
  getRangosSalariales(moneda){
    this.empService.getRangoSalariales(moneda).subscribe(resultado => {
      this.rangosSalariales = resultado;
    },
      error => {
        this.alert.showErrorMessage("Ha ocurrido un error", "Intentelo de nuevo");
        console.log("Error al obtener las discapacidades: ", JSON.stringify(error));
      });
  }
  //Agrega un idioma temporalmente
  agregarIdioma(form)
  {
    this.idiomasEscogidos.push(form.value)
  }
  //Elimina un idioma de los idiomas escogidos
  eliminarIdioma(idioma)
  {
    let indexIdioma =this.idiomasEscogidos.indexOf(idioma)
    this.
    idiomasEscogidos.splice(indexIdioma,1)
  }
  //Agrega un software temporalmente
  agregarSoftware(form)
  {
    this.softwaresEscogidos.push(form.value)
  }
  //Elimina un software de los softwares escogidos
  eliminarSoftware(software)
  {
    let indexSoftware=this.softwaresEscogidos.indexOf(software)
    this.softwaresEscogidos.splice(indexSoftware,1)
  }
  //Agrega una pregunta temporalmente
  agregarPregunta(form){
    this.preguntasEscogidas.push(form.value.pregunta)
  }
  //Elimina una pregunta de las preguntas escogidos
  eliminarPregunta(pregunta)
  {
    let indexPregunta=this.preguntasEscogidas.indexOf(pregunta)
    this.preguntasEscogidas.splice(indexPregunta,1)
  }
  //Agrega una ubicacion temporalmente
  agregarUbicacion(form)
  {
    this.ubicacionesEscogidas.push(form.value)
  }
  //Elimina una ubicacion de las ubicaciones escogidos
  eliminarUbicacion(ubicacion)
  {
    let indexUbicacion =this.ubicacionesEscogidas.indexOf(ubicacion)
    this.ubicacionesEscogidas.splice(indexUbicacion,1)
  }
  //Guarda o elimina el nombre de las areas de conocimiento escogidas
  areasSeleccionadas(event)
  {
    //Si el usuario a seleccionado o deseleccionado un area de conocomiento
    if(event.isUserInput) {
      let areas = this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value
      if(areas == null){
        //Si no hay ningun area en el vector se agrega el area selecionada
        this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').setValue([event.source.viewValue])
      }
      else{
        let pos = this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value.indexOf(event.source.viewValue)
        if(pos==-1){
          //Si no se encuentra ningun area en el vector se agrega el area selecionada
          this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value.push(event.source.viewValue)
        }
        else{
            //Si el area seleccionada se encuentra en el vector entonces se elimina
            this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value.splice(pos,1)
      }
    }
    }
  }
  //Guarda el nombre del sector seleccionado
  sectorSeleccionado(event)
  {
    if(event.isUserInput) {
      this.formOfertaLaboral.controls['informacionPrincipal'].get('sector').setValue(event.source.viewValue);
    }
  }
  //Guarda el nombre del estudio minimo seleccionado
  estudioMinimoSeleccionado(event)
  {
    if(event.isUserInput) {
      this.formOfertaLaboral.controls['requisitos'].get('estudioMinimo').setValue(event.source.viewValue);
    }
  }
  //Guarda o elimina el nombre de los programas escogidos
  programasSeleccionados(event)
  {
    if(event.isUserInput) {
      //Si el usuario a seleccionado o deseleccionado un programa
      let programas = this.formOfertaLaboral.controls['requisitos'].get('programas').value
      if(programas == null){
        //Si no hay ningun programa en el vector se agrega el programa 
        this.formOfertaLaboral.controls['requisitos'].get('programas').setValue([event.source.viewValue])
      }
      else{
        let pos = this.formOfertaLaboral.controls['requisitos'].get('programas').value.indexOf(event.source.viewValue)
        if(pos==-1){
          //Si no se encuentra ningun programa en el vector se agrega el programa 
          this.formOfertaLaboral.controls['requisitos'].get('programas').value.push(event.source.viewValue)
        }
        else{
          //Si el programa seleccionado se encuentra en el vector entonces se elimina
          this.formOfertaLaboral.controls['requisitos'].get('programas').value.splice(pos,1)
      }
    }
    }
  }
  //Guarda el nombre del idioma seleccionado
  idiomaSeleccionado(event)
  {
    if(event.isUserInput) {
      this.formIdioma.get('nombre').setValue(event.source.viewValue);
    }
  }
  //Guarda o elimina el nombre de las discapacidades escogidas
  discapacidadesSeleccionadas(event)
  {
    if(event.isUserInput) {
      //Si el usuario a seleccionado o deseleccionado una discapacidad
      let discapacidades = this.formOfertaLaboral.controls['requisitos'].get('discapacidades').value
      if(discapacidades == null){
        //Si no hay ninguna discapacidad en el vector se agrega la discapacidad 
        this.formOfertaLaboral.controls['requisitos'].get('discapacidades').setValue([event.source.viewValue])
      }
      else{
        let pos = this.formOfertaLaboral.controls['requisitos'].get('discapacidades').value.indexOf(event.source.viewValue)
        if(pos==-1){
          //Si no se encuentra ninguna discapacidad en el vector se agrega la discapacidad selecionada
          this.formOfertaLaboral.controls['requisitos'].get('discapacidades').value.push(event.source.viewValue)
        }
        else{
            //Si la discapacidad seleccionada se encuentra en el vector entonces se elimina
            this.formOfertaLaboral.controls['requisitos'].get('discapacidades').value.splice(pos,1)
      }
    }
    }
  }
  //Guarda el nombre de la ciudad seleccionada
  ciudadSeleccionada(event){
    if(event.isUserInput) {
      this.formUbicacion.get('ciudad').setValue(event.source.viewValue);
    }
  }
  //Guarda el valor del rango salarial seleccionado
  rangoSalarialSeccionado(event)
  {
    if(event.isUserInput) {
      this.formOfertaLaboral.controls['contrato'].get('rangoSalarial').setValue(event.source.viewValue);
    }
  }
  //Crea la oferta laboral
  registrarOfertaLaboral(form)
  {
    //Agrega todos los idiomas seleccionados al form de oferta laboral
    this.formOfertaLaboral.controls['requisitos'].get('idiomas').setValue(this.idiomasEscogidos); 
    //Agrega todos los softwares seleccionados al form de oferta laboral
    this.formOfertaLaboral.controls['requisitos'].get('softwareOferta').setValue(this.softwaresEscogidos);
    //Agrega todas las preguntas seleccionadas al form de oferta laboral
    this.formOfertaLaboral.controls['requisitos'].get('preguntasCandidato').setValue(this.preguntasEscogidas);
    //Agrega todas las ubicaciones seleccionadas al form de oferta laboral
    this.formOfertaLaboral.controls['informacionPrincipal'].get('ubicaciones').setValue(this.ubicacionesEscogidas);
    let idsCiudades = [] //Guarda los id de las ciudades Seleccionadas
    for (let i=0; i<this.ubicacionesEscogidas.length;i++){
      idsCiudades.push(this.ubicacionesEscogidas[i].idCiudad)  
    }
    //Agrega todas los ids de las ubicaciones seleccionadas al form de oferta laboral
    this.formOfertaLaboral.controls['informacionPrincipal'].get('idUbicaciones').setValue(idsCiudades)
    if(form.status !== "INVALID"){
      console.log(form.value)
      //Si los datos son valios abre el dialog de previzualizacion
      this.openDialog(form.value)
    }
    else
    {
      this.alert.showErrorMessage('Datos incorrectos','Por favor verique que todos los datos esten ingresados correctamente')
    }
  }

  /**
 * Abre un dialog de angular material
 * El contenido del dialog esta creado en el componente DialogInfoOfertaComponent
 */
  openDialog(datos) {
    const dialogRef = this.matDialog.open(DialogInfoOfertaComponent, {
      width: '60%',
      data: { datos: datos, crear: false} //Envia los datos del form al componente
    });
    dialogRef.afterClosed().subscribe(result => {
        //Al cerrar el dialog si el resultado es verdadero se crea la oferta
        if(result) {
          this.empService.crearOfertaLaboral(this.id,datos).subscribe(resultado => {
            this.alert.showSuccesMessage('Exito','Se ha creado la oferta exitosamente')
            .then((value) => {
              this.router.navigate(['empresa/'+this.id+'/misOfertas']);
            });
          },
            error => {
              this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde")
              console.log("Error al crear la oferta: ", JSON.stringify(error));
            });
        }
    });
  }

}
