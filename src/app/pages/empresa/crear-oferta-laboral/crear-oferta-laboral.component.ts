import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogInfoOfertaComponent } from '../dialog-info-oferta/dialog-info-oferta.component';
import { MatDialog } from '@angular/material';
import { GeneralesService } from 'src/app/shared/servicios/generales.service';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';

export interface idioma{
  id:String
  nombre:String;
  lectura:String;
  escritura:String;
  conversacion:String;
}
export interface software{
  nombre:String;
  nivel:String;
}
export interface ubicacion{
  id:string;
  nombre:string;
}

@Component({
  selector: 'app-crear-oferta-laboral',
  templateUrl: './crear-oferta-laboral.component.html',
  styleUrls: ['./crear-oferta-laboral.component.css'],
})

export class CrearOfertaLaboralComponent implements OnInit {

  id: string;
  isLinear = true;
  formOfertaLaboral: FormGroup;
  formIdioma:FormGroup;
  formSoftware:FormGroup;
  formPregunta:FormGroup;
  formUbicacion:FormGroup;
  idiomasEscogidos = []
  softwaresEscogidos = []
  preguntasEscogidas = []
  ubicacionesEscogidas = []
  labelPosition = 'before';
  cargos = [
    {
      "idCargo":1,
      "Nombre":"prueba"
    }
  ]
  sectores = [
    {
        "idSector": 1,
        "Nombre": "Agropecuario"
    },
    {
        "idSector": 2,
        "Nombre": "Alimentos"
    },
    {
        "idSector": 3,
        "Nombre": "Asegurador"
    }]
    areas = [
      {
          "id_aut_areaconocimiento": 1,
          "nombre": "Administrativo"
      },
      {
          "id_aut_areaconocimiento": 2,
          "nombre": "Agronomía"
      },
      {
          "id_aut_areaconocimiento": 3,
          "nombre": "Alimentos y bebidas"
      }]
  programas = [
    {
      "idPrograma": 1,
      "Nombre": "Ingeniería de Sistemas"
  },
  {
      "idPrograma": 2,
      "Nombre": "Física"
  }
  ]
  discapacidades = [
      {
          "idDiscapacidad": 1,
          "Nombre": "Auditiva"
      },
      {
          "idDiscapacidad": 2,
          "Nombre": "Física"
      },
      {
          "idDiscapacidad": 3,
          "Nombre": "Fonética"
      },
      {
          "idDiscapacidad": 4,
          "Nombre": "Mental"
      },
      {
          "idDiscapacidad": 5,
          "Nombre": "Multiples"
      },
      {
          "idDiscapacidad": 6,
          "Nombre": "Visual"
      },
      {
          "idDiscapacidad": 7,
          "Nombre": "Epilepsias/Crisis Convulsivas"
      },
      {
          "idDiscapacidad": 8,
          "Nombre": "Intelectual"
      }
  ]
  idiomas = [
    {
        "idIdioma": 1,
        "Nombre": "Afrikaans"
    },
    {
        "idIdioma": 2,
        "Nombre": "Albanés"
    },
    {
        "idIdioma": 3,
        "Nombre": "Alemán"
    }]
  ubicaciones = [
    {
      "nombre": "Amas",
      "id_departamento": 1,
      "ciudades": [
          {
              "nombre": "El Encanto",
              "id_ciudad": 1
          }
      ]},
    {
      "nombre": "Amazonas",
      "id_departamento": 1,
      "ciudades": [
          {
              "nombre": "El Encanto",
              "id_ciudad": 1
          },
          {
              "nombre": "La Chorrera",
              "id_ciudad": 2
          },
          {
              "nombre": "La Pedrera",
              "id_ciudad": 3
          },
          {
              "nombre": "La Victoria",
              "id_ciudad": 4
          }
      ]}
  ]
    datos = {
    "informacionPrincipal": {
        "nombreOferta": "Oferta ejemplo 1",
        "descripcion": "Descripcion oferta 1",
        "cargo": "Otro",
        "numVacantes": 3,
        "sector": "Administrartivo",
        "nombreTempEmpresa": null,
        "areas": [
            "Informatica",
            "tecnologia"
        ],
        "vigenciaDias": 30,
        "ubicaciones": [
            {"pais": "Colombia","departamento": "Cauca","ciudad": "popayan"},
            {"pais": "Colombia","departamento": "valle Cauca","ciudad": "cali"}
        ]
    },
    "contrato": {
        "tipoContrato": "Término indefinido",
        "formaPago": "Dolares",
        "rangoSalarial":null,
        "duracion": null,
        "horario": null,
        "jornada": "Medio tiempo",
        "comentariosSalario": null
    },
    "requisitos": {
        "perfil": "Profesional",
        "programa": "sistemas",
        "anios": 2,
        "experienciaLaboral": "Mayor o igual que",
        "requisitosMinimos": "Ser muy atento",
        "movilizacionPropia": "si",
        "licenciaConduccion": "moto",
        "discapacidad": "ciego",
        "idiomas": [
         {nombre: "ingles", nivel_lectura: "baji" ,nivel_escritura:"bajo",nivel_conversacion:"bajo" }
        ],
        "softwareOferta": [
          {nombre: "asdasd", nivel: "baji" }

        ],
        "preguntasCandidato": [
          "¿tiene problemas con compartir tiempo con animales y demas posibilidades de viaje?",
                    "¿tiene problemas con compartir tiempo con animales y demas posibilidades de viaje?"
           
        ]
    },
    "contactoHV":{
    	"correo":"correocontacto@mail.com",
    	"nombres":"Nom Contacto",
    	"apellidos":"Apellidos",
    	"telefonoMovil":1234567890
    }
}
datosFormChecked: FormGroup;
  constructor( private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private matDialog: MatDialog,
    private servGenerales: GeneralesService,
    private empService: EmpresaService,    private router: Router,
    ) { 
      this.datosFormChecked = this.formBuilder.group({ 
        idiomaChecked: [false],
        softwareChecked: [false],
        preguntasChecked: [false],
        discapacidadChecked: [false]
      });
      this.formIdioma = this.formBuilder.group({
        id:[null,Validators.required],
        nombre:[null],
        nivel_lectura:[null,Validators.required],
        nivel_escritura:[null,Validators.required],
        nivel_conversacion:[null,Validators.required]
      });
      this.formSoftware = this.formBuilder.group({
        nombre:[null,Validators.required],
        nivel:[null,Validators.required]
      });
      this.formPregunta = this.formBuilder.group({
        pregunta:[null,Validators.required],
      });
      this.formUbicacion = this.formBuilder.group({
        pais:['Colombia',Validators.required],
        departamento:[null,Validators.required],
        idCiudad:[null,Validators.required],
        ciudad:[null],  
      });
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
          idAreaConocimiento:[null, Validators.required],
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
          rangoSalarial:[null],
          comentariosSalario:[null]
        }),
        'requisitos':this.formBuilder.group({
          perfil:[null,Validators.required],
          idEstudioMinimo:[null,Validators.required],
          estudiosMinimos:[null],
          programa:[null],
          idPrograma:[null,Validators.required],
          anios:[null,[Validators.required,Validators.min(0)]],
          experienciaLaboral:[null,Validators.required],
          requisitosMinimos:[null,Validators.required], 
          movilizacionPropia:[null,Validators.required], 
          licenciaConduccion:[null],
          discapacidad:[null],
          idDiscapacidad:[null],
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
    this.cargarCargos();
    this.cargarAreas();
    this.cargarSectores();
    this.cargarProgramas();
    this.cargarIdiomas();
    this.cargarDiscapacidades();
    this.cargarUbicaciones();
    this.cargarContactoHv();
  } 
  cargarCargos(){
    this.servGenerales.obtenerListaCargos().subscribe(resultado => {
      this.cargos = resultado;
    },
      error => {
        console.log("Error al obtener los cargos: ", JSON.stringify(error));
      });
  }
  cargarAreas(){
    this.empService.obtenerAreasConocimiento().subscribe(resultado => {
    this.areas = resultado;
    },
      error => {
        console.log("Error al obtener los cargos: ", JSON.stringify(error));
      });
  }
  cargarSectores(){
    this.servGenerales.obtenerListaSectores().subscribe(resultado => {
      this.sectores = resultado;
    },
      error => {
        console.log("Error al obtener los sectores: ", JSON.stringify(error));
      });
  }
  cargarProgramas(){
    this.empService.obtenerProgramas().subscribe(resultado => {
      this.programas = resultado;
    },
      error => {
        console.log("Error al obtener los programas: ", JSON.stringify(error));
      });
  }
  cargarIdiomas(){
    this.empService.obtenerIdiomas().subscribe(resultado => {
      this.idiomas = resultado;
    },
      error => {
        console.log("Error al obtener los idiomas: ", JSON.stringify(error));
      });
  }
  cargarDiscapacidades()
  {
    this.empService.obtenerDiscapacidades().subscribe(resultado => {
      this.discapacidades = resultado;
    },
      error => {
        console.log("Error al obtener las discapacidades: ", JSON.stringify(error));
      });
  }
  cargarUbicaciones()
  {
    let idPaisColombia = '';
    this.servGenerales.obtenerListaDepartamentosCiudades(idPaisColombia).subscribe(resultado => {
      this.ubicaciones = resultado;
    },
      error => {
        console.log("Error al obtener las ubicaciones: ", JSON.stringify(error));
      });
  }
  cargarContactoHv()
  {
    this.servGenerales.getDatosContactoHv().subscribe(resultado => {
     //IMPLEMENTAR
    },
      error => {
        console.log("Error al obtener los datos de contacto: ", JSON.stringify(error));
      });
  }
  agregarIdioma(form)
  {
    this.idiomasEscogidos.push(form.value)
  }
  eliminarIdioma(idioma)
  {
    let indexIdioma =this.idiomasEscogidos.indexOf(idioma)
    this.idiomasEscogidos.splice(indexIdioma,1)
  }
  agregarSoftware(form)
  {
    this.softwaresEscogidos.push(form.value)
  }
  eliminarSoftware(software)
  {
    let indexSoftware=this.softwaresEscogidos.indexOf(software)
    this.softwaresEscogidos.splice(indexSoftware,1)
  }
  agregarPregunta(form){
    this.preguntasEscogidas.push(form.value.pregunta)
  }
  eliminarPregunta(pregunta)
  {
    let indexPregunta=this.preguntasEscogidas.indexOf(pregunta)
    this.preguntasEscogidas.splice(indexPregunta,1)
  }
  agregarUbicacion(form)
  {
    this.ubicacionesEscogidas.push(form.value)
  }
  eliminarUbicacion(ubicacion)
  {
    let indexUbicacion =this.ubicacionesEscogidas.indexOf(ubicacion)
    this.ubicacionesEscogidas.splice(indexUbicacion,1)
  }
  areasSeleccionadas(event)
  {
    if(event.isUserInput) {
      let areas = this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value
      if(areas == null){
        this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').setValue([event.source.viewValue])
      }
      else{
        let pos = this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value.indexOf(event.source.viewValue)
        if(pos==-1){
          this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value.push(event.source.viewValue)
        }
        else{          
            this.formOfertaLaboral.controls['informacionPrincipal'].get('areas').value.splice(pos,1)
      }
    }
    }
  }
  sectorSeleccionado(event)
  {
    if(event.isUserInput) {
      this.formOfertaLaboral.controls['informacionPrincipal'].get('sector').setValue(event.source.viewValue);
    }
  }
  estudioMinimoeleccionado(event)
  {
    if(event.isUserInput) {
      this.formOfertaLaboral.controls['requisitos'].get('estudiosMinimos').setValue(event.source.viewValue);
    }
  }
  programaSeleccionado(event)
  {
    if(event.isUserInput) {
      this.formOfertaLaboral.controls['requisitos'].get('programa').setValue(event.source.viewValue);
    }
  }
  idiomaSeleccionado(event)
  {
    if(event.isUserInput) {
      this.formIdioma.get('nombre').setValue(event.source.viewValue);
    }

  }
  discapacidadSeleccionada(event)
  {
    if(event.isUserInput) {
      this.formOfertaLaboral.controls['requisitos'].get('discapacidad').setValue(event.source.viewValue);
    }
  }
  ciudadSeleccionada(event){
    if(event.isUserInput) {
      this.formUbicacion.get('ciudad').setValue(event.source.viewValue);
    }
  }
  registrarOfertaLaboral(form)
  {
    this.formOfertaLaboral.controls['requisitos'].get('idiomas').setValue(this.idiomasEscogidos);
    this.formOfertaLaboral.controls['requisitos'].get('softwareOferta').setValue(this.softwaresEscogidos);
    this.formOfertaLaboral.controls['requisitos'].get('preguntasCandidato').setValue(this.preguntasEscogidas);
    this.formOfertaLaboral.controls['informacionPrincipal'].get('ubicaciones').setValue(this.ubicacionesEscogidas);
    let idsCiudades = []
    for (let i=0; i<this.ubicacionesEscogidas.length;i++){
      idsCiudades.push(this.ubicacionesEscogidas[i].idCiudad)
    }
    this.formOfertaLaboral.controls['informacionPrincipal'].get('idUbicaciones').setValue(idsCiudades)
    if(form.status !== "INVALID"){
      this.openDialog(form.value)
    }
    else
    {
      alert('Datos incorrectos')
    }
  }

  /**
 * Abre un dialog de angular material
 * El contenido del dialog esta creado en el componente DialogFinalRegistroComponent
 * <p>
 * Si se cierra el dialog redirige a la pagina principal
 */
  openDialog(datos) {
    const dialogRef = this.matDialog.open(DialogInfoOfertaComponent, {
      width: '60%',
      data: { datos: datos }
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log(result)
          this.empService.crearOfertaLaboral(this.id,datos);
        }
    });
  }
}
