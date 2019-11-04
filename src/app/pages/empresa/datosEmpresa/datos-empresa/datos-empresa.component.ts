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

  constructor(private formBuilder: FormBuilder, private empresaService : EmpresaService, private router: Router) { }



  modificarDatos() {
    this.router.navigate(['/editarEmpresa', JSON.stringify('1')]);
  }
  ngOnInit() {
    

   


    
    this.empresaService.getDatos()
    .subscribe(data => {
      this.data = data;
      console.log(data);
      // obtener la data y pasarla al form
      this.formRegistroEmp = this.formBuilder.group({
        'datos-cuenta': this.formBuilder.group({
          email: [{value: data.user.email, disabled:true} ],
        }),
        'datos-generales-empresa': this.formBuilder.group({
          nit: [{value: data.nit, disabled:true}],
          razonSocial: [{value: data.razon_social, disabled:true} ],
          nombreEmpresa: [{value: data.nombre, disabled:true}],
          anioCreacion: [{value: data.anio_creacion, disabled:true}],
          numEmpleados: [{value: data.numero_empleados, disabled:true}],
          ingresosEmp: [{value: data.ingresos, disabled:true}],
          descripcionEmpresa: [{value: "falta", disabled:true}],
        }),
        'sectores': this.formBuilder.group({
          sectores: [{value: data.sub_sectores, disabled:true}],
        }),
        'loc-contact-empresa': this.formBuilder.group({
          paisEmp: [{value: data.direccion.ciudad.departamento.pais.nombre, disabled:true}],
          departamentoEmp: [{value: data.direccion.ciudad.departamento.nombre, disabled:true}],
          ciudadEmp: [{value: data.direccion.ciudad.nombre, disabled:true}],
          direccionEmp: [{value: data.direccion.direccion, disabled:true}],
          barrioEmp: [{value: data.direccion.barrio, disabled:true}],
          codigoPostalEmp: [{value: data.direccion.codigo_postal, disabled:true}],
          telefonoEmp: [{value: data.telefono, disabled:true}],
          emailEmp: [{value: data.correo, disabled:true}],
          sitioWebEmp: [{value: data.sitio_web, disabled:true}]
        }),
        'datos-resp-legal':this.formBuilder.group({
          nombreRespLegal: [{value: data.representante.nombre, disabled:true}],
          apellidoRespLegal: [{value: data.representante.apellidos, disabled:true}],
          telefonoFijoRespLegal: [{value: data.representante.telefono, disabled:true}],
          telefonoMovilRespLegal: [{value: data.representante.telefono_movil, disabled:true}],
        }),
        'datos-resp-cuenta-empresa': this.formBuilder.group({
          nombreResp: [{value: data.administrador.nombres, disabled:true}],
          apellidoResp: [{value: data.administrador.apellidos, disabled:true}],
          cargo: [{value: data.cargo.nombre, disabled:true}], //se recibe de la base de datos
          horarioContacto: [{value: data.administrador.horario_contacto, disabled:true}],
          telefonoResp: [{value: data.administrador.telefono, disabled:true}],
          telefonoMovilResp: [{value: data.administrador.telefono_movil, disabled:true}],
          direccionTrabajo: [{value: data.administrador.direccion.direccion, disabled:true}],
          emailCorpResp: [{value: data.administrador.correo_corporativo, disabled:true}]
        })
      });
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
