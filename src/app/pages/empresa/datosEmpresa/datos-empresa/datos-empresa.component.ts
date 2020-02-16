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

  id: string; //Id de la empresa;
  showSpinner = true;  //Determina cuando se muestra el spinner
  data:any; //Informacion de la empresa
  formDatosEmp: FormGroup; //formulario de los datos de la empresa 
  constructor(private formBuilder: FormBuilder, private empresaService : EmpresaService, 
    private router: Router, private activatedRoute: ActivatedRoute,private alert: AlertService
    ) {
      //Formularioa de lso datos de la empresa
      this.formDatosEmp = this.formBuilder.group({
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
  //Inicializa la informacion
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');//Obtiene el id de la empresa
      // obtiene la informacion de la empresa y pasarla al form
     this.empresaService.getDatos(this.id)
    .subscribe(data => {
      this.data = data;
      this.formDatosEmp.controls['datos-cuenta'].get('email').setValue(data.administrador.user.email);
      this.formDatosEmp.controls['datos-generales-empresa'].get('nit').setValue(data.nit);
      this.formDatosEmp.controls['datos-generales-empresa'].get('razonSocial').setValue(data.razon_social);
      this.formDatosEmp.controls['datos-generales-empresa'].get('nombreEmpresa').setValue(data.nombre);
      this.formDatosEmp.controls['datos-generales-empresa'].get('anioCreacion').setValue(data.anio_creacion);
      this.formDatosEmp.controls['datos-generales-empresa'].get('numEmpleados').setValue(data.numero_empleados);
      this.formDatosEmp.controls['datos-generales-empresa'].get('ingresosEmp').setValue(data.ingresos);
      this.formDatosEmp.controls['datos-generales-empresa'].get('descripcionEmpresa').setValue(data.descripcion);
      this.formDatosEmp.controls['sectores'].get('sectores').setValue(data.sectores);
      this.formDatosEmp.controls['loc-contact-empresa'].get('paisEmp').setValue(data.direccion.ciudad.departamento.pais.nombre);
      this.formDatosEmp.controls['loc-contact-empresa'].get('departamentoEmp').setValue(data.direccion.ciudad.departamento.nombre);
      this.formDatosEmp.controls['loc-contact-empresa'].get('ciudadEmp').setValue(data.direccion.ciudad.nombre);
      this.formDatosEmp.controls['loc-contact-empresa'].get('direccionEmp').setValue(data.direccion.direccion);
      this.formDatosEmp.controls['loc-contact-empresa'].get('barrioEmp').setValue(data.direccion.barrio);
      this.formDatosEmp.controls['loc-contact-empresa'].get('codigoPostalEmp').setValue(data.direccion.codigo_postal);
      this.formDatosEmp.controls['loc-contact-empresa'].get('telefonoEmp').setValue(data.telefono);
      this.formDatosEmp.controls['loc-contact-empresa'].get('emailEmp').setValue(data.correo);
      this.formDatosEmp.controls['loc-contact-empresa'].get('sitioWebEmp').setValue(data.sitio_web);
      this.formDatosEmp.controls['datos-resp-legal'].get('nombreRespLegal').setValue(data.representante.nombre);
      this.formDatosEmp.controls['datos-resp-legal'].get('apellidoRespLegal').setValue(data.representante.apellidos);
      this.formDatosEmp.controls['datos-resp-legal'].get('telefonoFijoRespLegal').setValue(data.representante.telefono);
      this.formDatosEmp.controls['datos-resp-legal'].get('telefonoMovilRespLegal').setValue(data.representante.telefono_movil);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('nombreResp').setValue(data.administrador.nombres);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('apellidoResp').setValue(data.administrador.apellidos);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('cargo').setValue(data.administrador.cargo.nombre);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('horarioContacto').setValue(data.administrador.horario_contacto);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('telefonoResp').setValue(data.administrador.telefono);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('telefonoMovilResp').setValue(data.administrador.telefono_movil);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('direccionTrabajo').setValue(data.administrador.direccion.direccion);
      this.formDatosEmp.controls['datos-resp-cuenta-empresa'].get('emailCorpResp').setValue(data.administrador.correo_corporativo);
      this.showSpinner = false; //Cierra el spinner
    }),
    error => {
    this.showSpinner = false; //Cierra el spinner
    this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
  }
  }
   //Redirige a la pagian de modificacion de los datos de la empresa
   modificarDatos() {
    const url = 'empresa/' + this.id + '/editarEmpresa'
    this.router.navigate([url]);
  }
  //Modifica la foto de la empresa
  modificarFoto(event){

  //No implementado futuras generaciones
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
