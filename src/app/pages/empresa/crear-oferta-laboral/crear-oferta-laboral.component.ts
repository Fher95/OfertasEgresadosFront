import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogInfoOfertaComponent } from '../dialog-info-oferta/dialog-info-oferta.component';
import { MatDialog } from '@angular/material';
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
  styleUrls: ['./crear-oferta-laboral.component.css']
})

export class CrearOfertaLaboralComponent implements OnInit {

  id: string;
  formOfertaLaboral: FormGroup;
  idioma:FormGroup;
  labelPosition = 'before';
  idiomaChecked = false;
  softwareChecked = false;
  preguntasChecked = false;

  datos = {
    "informacionPrincipal": {
        "nombreCargo": "Oferta ejemplo 1",
        "descripcion": "Descripcion oferta 1",
        "cargoNombre": "Otro",
        "otroCargo": "Cargo d eejemplo",
        "numVacantes": 3,
        "sectorNombre": "Administrartivo",
        "nombreTempEmpresa": null,
        "AreasConocimiento": [
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
        "estudiosMinimos": "sistemas",
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

  constructor( private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private matDialog: MatDialog,
    ) { 

    this.formOfertaLaboral = this.formBuilder.group({ 
      'informacion-principal': this.formBuilder.group({
        nombreOferta: [null, Validators.required],
        descripcion: [null, Validators.required],
        idCargo:[null, Validators.required],
        otroCargo:[null],
        numVacantes: [null, Validators.required],
        idSector:[null, Validators.required],
        nombreTempEmpresa: [null],
        idAreaConocimiento:[null, Validators.required],
        vigenciaDias:[null,Validators.required],
        ubicacion:[[]]
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
        idEstudiosMinimos:[null,Validators.required],
        anios:[null,Validators.required],
        experienciaLaboral:[null,Validators.required],
        requisitosMinimos:[null,Validators.required], 
        movilizacionPropia:[null,Validators.required], 
        licenciaConduccion:[null],
        idDiscapacidad:[null],
        idiomas:[[]],  
        softwareOferta:[[]],
        preguntasCandidato:[[]]        
      })/*,
      'persona-contacto':this.formBuilder.group({
        email:[null],
        contacto:[null],
        telefono:[null],
        ext:[null]
      }),
      'vigencia':this.formBuilder.group({
      }),
      'observacion-oferta':this.formBuilder.group({
        observacion:[null]
      }),
      'observacion-administrador':this.formBuilder.group({
        observacion:[null]
      }),
      'persona-contacto-interno':this.formBuilder.group({
        email:[null],
        contacto:[null],
        telefono:[null],
        ext:[null]
      })*/
    });

    
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  registrarOfertaLaboral(form)
  {
    
  }
  /**
 * Abre un dialog de angular material
 * El contenido del dialog esta creado en el componente DialogFinalRegistroComponent
 * <p>
 * Si se cierra el dialog redirige a la pagina principal
 */
  openDialog() {
    const dialogRef = this.matDialog.open(DialogInfoOfertaComponent, {
      width: '60%',

      data: { datos: this.datos }
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          alert('modifica');
        }
    });
  }
}
