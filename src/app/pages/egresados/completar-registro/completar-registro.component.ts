import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css']
})
export class CompletarRegistroComponent implements OnInit {
  
  //Formulario infoPersonalComplementaria
  infoPersonalComplementaria = new FormGroup(
    {
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
  //Formulario comentarios
  comentarios = new FormGroup(
    {
      ComentarioPrograma : new FormControl('', [Validators.required,Validators.maxLength(100)]),
      ComentarioFuturoEgresado : new FormControl('', [Validators.required,Validators.maxLength(100)]),
      DocenteInfluencia : new FormControl('', [Validators.required])
    }
  );

  //Respuesta para el hijo 
  opHijo: boolean = false;
  //Listas opciones
  cantHijos: string[] = [ "1 hijo", "2 hijos", "3 hijos", "4 hijos", "5 hijos", "Más de 5 hijos"];
  rangoSalarial: string[] = ["Menos de $1.000.000","$1.000.001 - $2.000.000",
                            "$2.000.001 - $3.000.000","$3.000.001 - $6.000.000",
                            "$6.000.001 - $10.000.000","Más de $10.000.000"];
  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  constructor() {
    
   }

  ngOnInit() {
  }
  
  //Obtener el valor radioButton hijos
  cambioRadioBtnHijo(cambio:MatRadioChange)
  {
    var aux = cambio.value;
    console.log(this.opHijo);
    if(aux == "siHijos")
    {
      this.opHijo = true;
    }
  }
  getErrorMessage() {
    return this.infoPersonalComplementaria.get('CorreoEsposo').hasError('required') ? 'You must enter a value' :
    this.infoPersonalComplementaria.get('CorreoEsposo').hasError('email') ? 'Not a valid email' :'';
  }
}
