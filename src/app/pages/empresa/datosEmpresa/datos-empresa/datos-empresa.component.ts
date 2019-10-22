import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthServicesService } from 'src/app/shared/servicios/authServices/auth-services.service';
@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})
export class DatosEmpresaComponent implements OnInit {

  empresaForm = this.fb.group({
    nit: [''],
    nombre: [''],
    email: [''],
    razonSocial: [''],
    añoCreacion: [''],
    pais: [''],
    departamento: [''],
    ciudad: [''],
    localidad: [''],
    codigoPostal: [''],
    direccionEmpresa: [''],
    numeroEmpleados: [''],
    ingresosEmpresa: [''],
    descripcionEmpresa: [''],
    sitioWeb: ['']
  });
  
  
  constructor(private fb: FormBuilder, private authService : AuthServicesService) { }

  ngOnInit() {
    this.authService.getDatos()
    .subscribe(data => {
      console.log(data)
    }),
    error => console.log(error)    
  }

  onSubmit() {
    // TODO: Use EventEmitter with formvalue);
  } 
}
