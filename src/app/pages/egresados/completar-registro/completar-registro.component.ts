import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material';
import { CompletarRegistro } from 'src/app/shared/modelos/completarRegistro';
import { ProgramaComponent } from '../programa/programa.component';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import { RegistroService } from 'src/app/shared/servicios/egresados/registro.service';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css']
})
export class CompletarRegistroComponent implements OnInit {

  @ViewChild('programaEsposo') programaEsposo : ProgramaComponent;
  @ViewChild('programaMadre') programaMadre : ProgramaComponent;
  @ViewChild('programaPadre') programaPadre : ProgramaComponent;
  @ViewChild('localizacionEmpresa') localizacionEmpresa : LocalizacionComponent;

  varCompletarRegistro : CompletarRegistro;

  //Formulario infoPersonalComplementaria
  infoPersonalComplementaria = new FormGroup(
    {
      TieneHijos : new FormControl('', [Validators.required]),
      CantHijos : new FormControl('', [Validators.required]),
      NombreEsposo : new FormControl('', [Validators.required]),
      EgresadoEsposo : new FormControl('', [Validators.required]),
      CorreoEsposo : new FormControl('', [Validators.required, Validators.email]),
      CelularEsposo : new FormControl('', [Validators.required]),
      NombreMadre : new FormControl('', [Validators.required]),
      EgresadoMadre : new FormControl('', [Validators.required]),
      CelularMadre : new FormControl('', [Validators.required]),
      NombrePadre : new FormControl('', [Validators.required]),
      EgresadoPadre : new FormControl('', [Validators.required]),
      CelularPadre : new FormControl('', [Validators.required])
    }
  );
  //Formulario infoLaboral 
  infoLaboral = new FormGroup(
    {
      haTrabajado : new FormControl('', [Validators.required]),
      Desempeño : new FormControl('', [Validators.required]),
      CargoDesempeño : new FormControl('', [Validators.required]),
      NombreEmpresa : new FormControl('', [Validators.required]),
      Labora_Actualmente : new FormControl('', [Validators.required]),
      Labora_Area : new FormControl('', [Validators.required]),     
      NombreCategoria : new FormControl('', [Validators.required]),
      NombreEmpresaActual : new FormControl('', [Validators.required]),
      DirTrabajo : new FormControl('', [Validators.required]),
      TelTrabajo : new FormControl('', [Validators.required]),
      CargoActual : new FormControl('', [Validators.required]),
      RangoSalario : new FormControl('', [Validators.required]),
      TipoContrato : new FormControl('', [Validators.required]),
      Sector : new FormControl('', [Validators.required])
    }
  );
  //Formulario comentarios
  comentarios = new FormGroup(
    {
      EstudiarUnicauca : new FormControl('', [Validators.required]),
      Carrera : new FormControl('', [Validators.required]),
      Razon : new FormControl('', [Validators.required]),
      ComentarioPrograma : new FormControl('', [Validators.required,Validators.maxLength(100)]),
      ComentarioFuturoEgresado : new FormControl('', [Validators.required,Validators.maxLength(100)]),
      DocenteInfluencia : new FormControl('', [Validators.required])
    }
  );

  //Respuesta para el hijo 
  opHijo: boolean = false;
  //Listas opciones
  cantHijos: string[] = [ "1", "2", "3", "4", "5", "Más de 5 hijos"];
  tipoContrato: string[] = ["Contrato a termino fijo","Contrato a termino indefinido","Contrato de Obra o labor",
                            "Contrato civil por prestación de servicios","Contrato de aprendizaje",
                            "Contrato ocasional de trabajo","Contrato temporal, ocasional o accidental"];
  rangoSalarial: string[] = ["Menos de $1.000.000","$1.000.001 - $2.000.000",
                            "$2.000.001 - $3.000.000","$3.000.001 - $6.000.000",
                            "$6.000.001 - $10.000.000","Más de $10.000.000"];
  carreras: string[] = ["Tecnología","Pregrado","Especialización","Maestría","Doctorado"];
  razon: string[] = ["Planta docente","Infraestructura","Planes de estudio","Otra razón"];

  constructor(private servicioCompletar: RegistroService) {
    this.limpiarFormulario();
    this.varCompletarRegistro = new CompletarRegistro();
   }

  ngOnInit() {
  }

  limpiarFormulario(){
    this.infoPersonalComplementaria = new FormGroup({});
    this.infoLaboral = new FormGroup({});
    this.comentarios = new FormGroup({});
  }

  llenarDatos(){
    this.varCompletarRegistro.num_hijos = this.infoPersonalComplementaria.get('CantHijos').value;
    //Información esposo
    this.varCompletarRegistro.esposo.nombres = this.infoPersonalComplementaria.get('NombreEsposo').value;
    this.varCompletarRegistro.esposo.id_nivel_educativo = this.programaEsposo.nivelAcademico.value;
    this.varCompletarRegistro.esposo.telefono_movil = this.infoPersonalComplementaria.get('CelularEsposo').value;
    this.varCompletarRegistro.esposo.correo = this.infoPersonalComplementaria.get('CorreoEsposo').value;
    this.varCompletarRegistro.esposo.parentesco = "esposo";
    this.varCompletarRegistro.esposo.id_aut_programa = this.programaEsposo.programa.value;
    this.varCompletarRegistro.esposo.es_egresado = this.infoPersonalComplementaria.get('EgresadoEsposo').value;
    //Información madre
    this.varCompletarRegistro.madre.nombres = this.infoPersonalComplementaria.get('NombreMadre').value;
    this.varCompletarRegistro.madre.id_nivel_educativo = this.programaMadre.nivelAcademico.value;
    this.varCompletarRegistro.madre.telefono_movil = this.infoPersonalComplementaria.get('CelularMadre').value;
    this.varCompletarRegistro.madre.correo = "";
    this.varCompletarRegistro.madre.parentesco = "madre";
    this.varCompletarRegistro.madre.id_aut_programa = this.programaMadre.programa.value;
    this.varCompletarRegistro.madre.es_egresado = this.infoPersonalComplementaria.get('EgresadoMadre').value;
    //Información padre
    this.varCompletarRegistro.esposo.nombres = this.infoPersonalComplementaria.get('NombrePadre').value;
    this.varCompletarRegistro.esposo.id_nivel_educativo = this.programaPadre.nivelAcademico.value;
    this.varCompletarRegistro.esposo.telefono_movil = this.infoPersonalComplementaria.get('CelularPadre').value;
    this.varCompletarRegistro.esposo.correo = "";
    this.varCompletarRegistro.esposo.parentesco = "padre";
    this.varCompletarRegistro.esposo.id_aut_programa = this.programaPadre.programa.value;
    this.varCompletarRegistro.esposo.es_egresado = this.infoPersonalComplementaria.get('EgresadoPadre').value;
    //Información laboral anterior
    this.varCompletarRegistro.ha_trabajado = this.infoLaboral.get('haTrabajado').value;
    this.varCompletarRegistro.exp_pasada.trabajo_en_su_area = this.infoLaboral.get('Desempeño').value;
    this.varCompletarRegistro.exp_pasada.cargo_nombre = this.infoLaboral.get('CargoDesempeño').value;
    this.varCompletarRegistro.exp_pasada.nombre_empresa = this.infoLaboral.get('NombreEmpresa').value;
    //Información laboral actual
    this.varCompletarRegistro.trabajo_actualmente = this.infoLaboral.get('Labora_Actualmente').value;
    this.varCompletarRegistro.exp_actual.trabajo_en_su_area = this.infoLaboral.get('Labora_Area').value;
    this.varCompletarRegistro.exp_actual.id_ciudad = this.localizacionEmpresa.ciudadFormControl.value;
    this.varCompletarRegistro.exp_actual.nombre_empresa = this.infoLaboral.get('NombreEmpresaActual').value;
    this.varCompletarRegistro.exp_actual.dir_empresa = this.infoLaboral.get('DirTrabajo').value;
    this.varCompletarRegistro.exp_actual.tel_trabajo = this.infoLaboral.get('TelTrabajo').value;
    this.varCompletarRegistro.exp_actual.cargo_nombre = this.infoLaboral.get('CargoActual').value;
    this.varCompletarRegistro.exp_actual.rango_salario = this.infoLaboral.get('RangoSalario').value;
    this.varCompletarRegistro.exp_actual.tipo_contrato = this.infoLaboral.get('TipoContrato').value;
    this.varCompletarRegistro.exp_actual.sector = this.infoLaboral.get('Sector').value;
  }
  verificarCampos(){
    
  }
  enviarDatos(){
    this.llenarDatos();
    //llamar al servicio y mandar la interface
    this.servicioCompletar.completarRegistroEgresado(this.varCompletarRegistro);

  }
}