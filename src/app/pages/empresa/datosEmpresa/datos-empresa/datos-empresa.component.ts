import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})


export class DatosEmpresaComponent implements OnInit {

  id: string;
  showSpinner = true;
  data:any;
  formRegistroEmp: FormGroup;

 
  constructor(private formBuilder: FormBuilder, private empresaService : EmpresaService, 
    private router: Router, private activatedRoute: ActivatedRoute,private alert: AlertService
    ) {
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
        descripcionEmpresa: [{value: '', disabled:true}],
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
    const url = 'empresa/' + this.id + '/editarEmpresa'
    this.router.navigate([url]);
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
     this.empresaService.getDatos(this.id)
    .subscribe(data => {
      this.data = data;
      // obtener la data y pasarla al form
      this.formRegistroEmp.controls['datos-cuenta'].get('email').setValue(data.administrador.user.email);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('nit').setValue(data.nit);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('razonSocial').setValue(data.razon_social);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('nombreEmpresa').setValue(data.nombre);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('anioCreacion').setValue(data.anio_creacion);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('numEmpleados').setValue(data.numero_empleados);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('ingresosEmp').setValue(data.ingresos);
      this.formRegistroEmp.controls['datos-generales-empresa'].get('descripcionEmpresa').setValue(data.descripcion);
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
      this.showSpinner = false;
    }),
    error => console.log(error);
    this.showSpinner = false;
    this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
  }

  modificarFoto(event){

  //No implementado
    /*
    let formData = new FormData();
    //formData.append('logoInput', this.logoInput.nativeElement.files[0]);

    console.log(event);
    let file = <File>event.target.files[0];
    //this.empresaService.modificarFoto(file);
    console.log(file);
    //document.getElementById(imgUser).style.backgroundImage =*/
  }

}
