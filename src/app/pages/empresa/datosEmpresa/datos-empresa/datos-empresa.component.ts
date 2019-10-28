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
   data = 'aaa';
   formRegistroEmp: FormGroup;


  constructor(private formBuilder: FormBuilder, private empresaService : EmpresaService, private router: Router) { }



  modificarDatos() {
    this.router.navigate(['/editarEmpresa', JSON.stringify(this.data)]);
  }




  ngOnInit() {
    this.empresaService.getDatos()
    .subscribe(data => {
      console.log(data);
      // obtener la data y pasarla al form
    /*  this.formRegistroEmp = this.formBuilder.group({
        'datos-cuenta': this.formBuilder.group({
          email: [{value: data.datosCuenta.email, disabled:true} ],
          usuario: [{value: data.datosCuenta.usuario, disabled:true}],
        }),
        'datos-generales-empresa': this.formBuilder.group({
          nit: [{value: data.datosGeneralesEmpresa.nit, disabled:true}],
          razonSocial: [{value: data.datosGeneralesEmpresa.razonSocial, disabled:true} ],
          nombreEmpresa: [{value: data.datosGeneralesEmpresa.nombreEmpresa, disabled:true}],
          anioCreacion: [{value: data.datosGeneralesEmpresa.anioCreacion, disabled:true}],
          numEmpleados: [{value: data.datosGeneralesEmpresa.numEmpleados, disabled:true}],
          ingresosEmp: [{value: data.datosGeneralesEmpresa.ingresosEmp, disabled:true}],
          descripcionEmpresa: [{value: data.datosGeneralesEmpresa.descripcionEmpresa, disabled:true}],
        }),
        'sectores': this.formBuilder.group({
          sectores: [{value: data.sectores.sectores, disabled:true}],
        }),
        'loc-contact-empresa': this.formBuilder.group({
          paisEmp: [{value: data.locContactoEmpresa.paisEmp, disabled:true}],
          departamentoEmp: [{value: data.locContactoEmpresa.departamentoEmp, disabled:true}],
          ciudadEmp: [{value: data.locContactoEmpresa.ciudadEmp, disabled:true}],
          direccionEmp: [{value: data.locContactoEmpresa.direccionEmp, disabled:true}],
          barrioEmp: [{value: data.locContactoEmpresa.barrioEmp, disabled:true}],
          codigoPostalEmp: [{value: data.locContactoEmpresa.codigoPostalEmp, disabled:true}],
          telefonoEmp: [{value: data.locContactoEmpresa.telefonoEmp, disabled:true}],
          emailEmp: [{value: data.locContactoEmpresa.emailEmp, disabled:true}],
          sitioWebEmp: [{value: data.locContactoEmpresa.sitioWebEmp, disabled:true}]
        }),
        'datos-resp-legal':this.formBuilder.group({
          nombreRespLegal: [{value: data.datosRespLegal.nombreRespLegal, disabled:true}],
          apellidoRespLegal: [{value: data.datosRespLegal.apellidoRespLegal, disabled:true}],
          telefonoFijoRespLegal: [{value: data.datosRespLegal.telefonoFijoRespLegal, disabled:true}],
          telefonoMovilRespLegal: [{value: data.datosRespLegal.telefonoMovilRespLegal, disabled:true}],
        }),
        'datos-resp-cuenta-empresa': this.formBuilder.group({
          nombreResp: [{value: data.datosRespCuentaEmpresa.nombreResp, disabled:true}],
          apellidoResp: [{value: data.datosRespCuentaEmpresa.apellidoResp, disabled:true}],
          cargo: [{value: data.datosRespCuentaEmpresa.cargo, disabled:true}], //se recibe de la base de datos
          paisResp: [{value: data.datosRespCuentaEmpresa.paisResp, disabled:true}],
          departamentoResp: [{value: data.datosRespCuentaEmpresa.departamentoResp, disabled:true}],
          ciudadResp: [{value: data.datosRespCuentaEmpresa.ciudadResp, disabled:true}],
          barrioResp: [{value: data.datosRespCuentaEmpresa.barrioResp, disabled:true}],
          direccionResp: [{value: data.datosRespCuentaEmpresa.direccionResp, disabled:true}],
          codigoPostalResp: [{value: data.datosRespCuentaEmpresa.codigoPostalResp, disabled:true}],
          telefonoResp: [{value: data.datosRespCuentaEmpresa.telefonoResp, disabled:true}],
          telefonoMovilResp: [{value: data.datosRespCuentaEmpresa.telefonoMovilResp, disabled:true}],
          horarioContacto: [{value: data.datosRespCuentaEmpresa.horarioContacto, disabled:true}],
          faxResp: [{value: data.datosRespCuentaEmpresa.faxResp, disabled:true}],
          emailCorpResp: [{value: data.datosRespCuentaEmpresa.emailCorpResp, disabled:true}]
        })
      });*/
    }),
    error => console.log(error)
    this.formRegistroEmp = this.formBuilder.group({
      'datos-cuenta': this.formBuilder.group({
        email: [{value: this.data, disabled:true} ],
        usuario: [{value: this.data, disabled:true}],
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
        sectores: [{value: this.data, disabled:true}],
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
        nombreRespLegal: [''],
        apellidoRespLegal: [''],
        telefonoFijoRespLegal: [''],
        telefonoMovilRespLegal: [''],
      }),
      'datos-resp-cuenta-empresa': this.formBuilder.group({
        nombreResp: [{value: this.data, disabled:true}],
        apellidoResp: [{value: this.data, disabled:true}],
        cargo: [{value: this.data, disabled:true}], //se recibe de la base de datos
        paisResp: [{value: this.data, disabled:true}],
        departamentoResp: [{value: this.data, disabled:true}],
        ciudadResp: [{value: this.data, disabled:true}],
        barrioResp: [{value: this.data, disabled:true}],
        direccionResp: [{value: this.data, disabled:true}],
        codigoPostalResp: [{value: this.data, disabled:true}],
        telefonoResp: [{value: this.data, disabled:true}],
        telefonoMovilResp: [{value: this.data, disabled:true}],
        horarioContacto: [{value: this.data, disabled:true}],
        faxResp: [{value: this.data, disabled:true}],
        emailCorpResp: [{value: this.data, disabled:true}]
      })
    });
    
  }



}
