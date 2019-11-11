import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor( private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { 

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
        comentariosSalario:[null]
      }),
      'requisitos':this.formBuilder.group({
        idrequisitosMinimos:[null,Validators.required],
        anios:[null,Validators.required],
        experienciaLaboral:[null,Validators.required],
        requisitosMinimos:[null,Validators.required],    
        licenciaConduccion:[null],
        idDiscapacidad:[null],
        idiomas:[[]],  
        softwareOferta:[[]],
        preguntasCandidato:[[]]
  //      tipoPerfil:[null,Validators.required],
    //    estudiosMinimos:[null,Validators.required],
        
      })/*,
      'clasificacion':this.formBuilder.group({
      }),
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

}
