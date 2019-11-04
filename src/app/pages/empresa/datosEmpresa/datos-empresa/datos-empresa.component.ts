import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})


export class DatosEmpresaComponent implements OnInit {
   data = 'a';
   formRegistroEmp: FormGroup;
   subsector: any[] = [
    { "nombre": "Estatal y Relacionados" },
  ];

  constructor(private formBuilder: FormBuilder, private empresaService : EmpresaService, private router: Router) {
    this.formRegistroEmp = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: [{value: '', disabled:true} ],
      }),
      'datos-generales-empresa': this.formBuilder.group({
        nit: [{value: '', disabled:true}],
        razonSocial: [{value: '', disabled:true} ],
        nombreEmpresa: [{value: '', disabled:true}],
        anioCreacion: [{value: '', disabled:true}],
        numEmpleados: [{value: '', disabled:true}],
        ingresosEmp: [{value: '', disabled:true}],
        descripcionEmpresa: [{value: "falta", disabled:true}],
      }),
      'sectores': this.formBuilder.group({
        sectores: [{value: '', disabled:true}],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        paisEmp: [{value: '', disabled:true}],
        departamentoEmp: [{value: '', disabled:true}],
        ciudadEmp: [{value:'', disabled:true}],
        direccionEmp: [{value: '', disabled:true}],
        barrioEmp: [{value: '', disabled:true}],
        codigoPostalEmp: [{value: '', disabled:true}],
        telefonoEmp: [{value: '', disabled:true}],
        emailEmp: [{value: '', disabled:true}],
        sitioWebEmp: [{value:'', disabled:true}]
      }),
      'datos-resp-legal':this.formBuilder.group({
        nombreRespLegal: [{value: '', disabled:true}],
        apellidoRespLegal: [{value: '', disabled:true}],
        telefonoFijoRespLegal: [{value: '', disabled:true}],
        telefonoMovilRespLegal: [{value: '', disabled:true}],
      }),
      'datos-resp-cuenta-empresa': this.formBuilder.group({
        nombreResp: [{value: '', disabled:true}],
        apellidoResp: [{value: '', disabled:true}],
        cargo: [{value: '', disabled:true}], //se recibe de la base de datos
        horarioContacto: [{value: '', disabled:true}],
        telefonoResp: [{value: '', disabled:true}],
        telefonoMovilResp: [{value: '', disabled:true}],
        direccionTrabajo: [{value: '', disabled:true}],
        emailCorpResp: [{value: '', disabled:true}]
      })
    });
  }

  modificarDatos() {
    this.router.navigate(['/editarEmpresa']);
  }
  ngOnInit() {
     this.empresaService.getDatos()
    .subscribe(data => {
      this.data = data;
      console.log(data);
      // obtener la data y pasarla al form
      this.formRegistroEmp.controls['datos-cuenta'].get('email').setValue(data.administrador.user.email);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('nit').setValue(data.nit);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('razonSocial').setValue(data.razon_social);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('nombreEmpresa').setValue(data.nombre);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('anioCreacion').setValue(data.anio_creacion);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('numEmpleados').setValue(data.numero_empleados);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('ingresosEmp').setValue(data.ingresos);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('descripcionEmpresa').setValue('FALTAAA FORERO AGREGALOOOOOOOO');
      this.formRegistroEmp.controls['sectores'].get('sectores').setValue(data.sectores);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('paisEmp').setValue(data.direccion.ciudad.departamento.pais.nombre);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('departamentoEmp').setValue(data.direccion.ciudad.departamento.nombre);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('ciudadEmp').setValue(data.direccion.ciudad.nombre);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('direccionEmp').setValue(data.direccion.direccion);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('barrioEmp').setValue(data.direccion.barrio);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('codigoPostalEmp').setValue(data.direccion.codigo_postal);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('telefonoEmp').setValue(data.telefono);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('emailEmp').setValue(data.correo);
      this.formRegistroEmp.controls['loc-contact-empresa'].get('sitioWebEmp').setValue(data.sitio_web);
      this.formRegistroEmp.controls['datos-resp-legal'].get('nombreRespLegal').setValue(data.representante.nombre);
      this.formRegistroEmp.controls['datos-resp-legal'].get('apellidoRespLegal').setValue(data.representante.apellidos);
      this.formRegistroEmp.controls['datos-resp-legal'].get('telefonoFijoRespLegal').setValue(data.representante.telefono);
      this.formRegistroEmp.controls['datos-resp-legal'].get('telefonoMovilRespLegal').setValue(data.representante.telefono_movil);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('nombreResp').setValue(data.administrador.nombres);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('apellidoResp').setValue(data.administrador.apellidos);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('cargo').setValue(data.administrador.cargo.nombre);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('horarioContacto').setValue(data.administrador.horario_contacto);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('telefonoResp').setValue(data.administrador.telefono);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('telefonoMovilResp').setValue(data.administrador.telefono_movil);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('direccionTrabajo').setValue(data.administrador.direccion.direccion);
      this.formRegistroEmp.controls['datos-resp-cuenta-empresa'].get('emailCorpResp').setValue(data.administrador.correo_corporativo);
    }),
    error => console.log(error);
    /*
    this.formRegistroEmp = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: [{value: this.data, disabled:true} ],
      }),
      'datos-generales-empresa': this.formBuilder.group({
        nit: [{value: this.data, disabled:true}],
        razonSocial: [{value: this.data, disabled:true} ],
        nombreEmpresa: [{value: this.data, disabled:true}],
        anioCreacion: [{value: this.data, disabled:true}],
        numEmpleados: [{value: this.data, disabled:true}],
        ingresosEmp: [{value: this.data, disabled:true}],
        descripcionEmpresa: [{value: this.data, disabled:true}],
      }),
      'sectores': this.formBuilder.group({
        sectores: [{value: this.subsector, disabled:true}],
      }),
      'loc-contact-empresa': this.formBuilder.group({
        paisEmp: [{value: this.data, disabled:true}],
        departamentoEmp: [{value: this.data, disabled:true}],
        ciudadEmp: [{value: this.data, disabled:true}],
        direccionEmp: [{value: this.data, disabled:true}],
        barrioEmp: [{value: this.data, disabled:true}],
        codigoPostalEmp: [{value: this.data, disabled:true}],
        telefonoEmp: [{value: this.data, disabled:true}],
        emailEmp: [{value: this.data, disabled:true}],
        sitioWebEmp: [{value: this.data, disabled:true}]
      }),
      'datos-resp-legal':this.formBuilder.group({
        nombreRespLegal: [{value: this.data, disabled:true}],
        apellidoRespLegal: [{value: this.data, disabled:true}],
        telefonoFijoRespLegal: [{value: this.data, disabled:true}],
        telefonoMovilRespLegal: [{value: this.data, disabled:true}],
      }),
      'datos-resp-cuenta-empresa': this.formBuilder.group({
        nombreResp: [{value: this.data, disabled:true}],
        apellidoResp: [{value: this.data, disabled:true}],
        cargo: [{value: this.data, disabled:true}], //se recibe de la base de datos
        telefonoResp: [{value: this.data, disabled:true}],
        telefonoMovilResp: [{value: this.data, disabled:true}],
        horarioContacto: [{value: this.data, disabled:true}],
        direccionTrabajo: [{value: this.data, disabled:true}],
        emailCorpResp: [{value: this.data, disabled:true}]
      })
    });
    console.log(this.formRegistroEmp.get('sectores').value.sectores);
    */
  }

  modificarFoto(event){
    console.log(event);
    let file = <File>event.target.files[0];
    //this.empresaService.modificarFoto(file);
    console.log(file);
    //document.getElementById(imgUser).style.backgroundImage =
  }

}
