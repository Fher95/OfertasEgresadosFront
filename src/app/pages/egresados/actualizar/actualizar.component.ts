import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  //Formulario infoPersonal
  infoPersonal = new FormGroup(
    {
      Nombres : new FormControl('', [Validators.required]),
      Apellido : new FormControl('', [Validators.required]),
      Telefono : new FormControl('', [Validators.required]),
      Celular : new FormControl('', [Validators.required]),
      DirResidencia : new FormControl('', [Validators.required]),
      Correo : new FormControl('', [Validators.required, Validators.email]),
      CorreoAlterno : new FormControl('', [Validators.required, Validators.email]),
      NombreEsposo : new FormControl('', [Validators.required]),
      CorreoEsposo : new FormControl('', [Validators.required, Validators.email]),
      NombreMadre : new FormControl('', [Validators.required]),
      CelularMadre : new FormControl('', [Validators.required]),
      NombrePadre : new FormControl('', [Validators.required]),
      CelularPadre : new FormControl('', [Validators.required])
    }
  );
  //Formulario infoLaboral 
  infoLaboral = new FormGroup(
    {
      CargoDesempeño : new FormControl('', [Validators.required]),
      NombreEmpresa : new FormControl('', [Validators.required]),
      NombreEmpresaActual : new FormControl('', [Validators.required]),
      DirTrabajo : new FormControl('', [Validators.required]),
      TelTrabajo : new FormControl('', [Validators.required]),
      CargoActual : new FormControl('', [Validators.required])
    }
  );

  //Listas opciones
  discapacidades: string[] = ["Visual", "Cognitiva", "Auditiva", "Fisica", "Ninguna"];
  estadoCivil : string[] = ["Soltero(a)","Casado(a)","Viudo(a)","Unión Libre","Separado(a)","Comprometido(a)",
                            "Divorciado(a)"];
  rangoSalarial: string[] = ["Menos de $1.000.000","$1.000.001 - $2.000.000",
                            "$2.000.001 - $3.000.000","$3.000.001 - $6.000.000",
                            "$6.000.001 - $10.000.000","Más de $10.000.000"];
                           

  constructor() { }

  ngOnInit() {
  }
}