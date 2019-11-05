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
        nombreCargo: [null, Validators.required],
        numVacantes: [null, Validators.required],
        idCargo:[null, Validators.required],
        tipoCargo: [null, Validators.required],
        idSector:[null, Validators.required],
        sector: [null, Validators.required],
        idAreaConocimiento:[null, Validators.required],
        areaConocimiento: [null, Validators.required],
        nombreEmpresa: [null],
        descripcion: [null, Validators.required],
      }),
      'contrato':this.formBuilder.group({
        tipoContrato:[null, Validators.required],
        duracion:[null],
        horario:[null],
        jornada:[null, Validators.required],
        formaPago:[null, Validators.required],
        salario:[null, Validators.required],
        comentarios:[null]
      }),
      'requisitos':this.formBuilder.group({
        tipoPerfil:[null,Validators.required],
        estudiosMinimos:[null,Validators.required],
        anos:[null,Validators.required],
        experienciaLaboral:[null,Validators.required],
        idiomas:[[]],  
        softwareOferta:[[]],
        requisitosMinimos:[null,Validators.required],
        personasDiscapacidad:[null],
        movilizacion:[null],
        licenciaConduccion:[null],
        preguntasCandidato:[null]
      }),
      'clasificacion':this.formBuilder.group({
        ubicacion:[[],Validators.required]
      }),
      'persona-contacto':this.formBuilder.group({
        email:[null],
        contacto:[null],
        telefono:[null],
        ext:[null]
      }),
      'vigencia':this.formBuilder.group({
        dias:[null,Validators.required]
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
      })
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  registrarOfertaLaboral(form)
  {

  }

}
