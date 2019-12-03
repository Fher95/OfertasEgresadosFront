import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ProgramaComponent } from '../programa/programa.component';
import { Referido } from 'src/app/shared/modelos/referido';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { CancelarDialogComponent } from '../cancelar-dialog/cancelar-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-referido',
  templateUrl: './referido.component.html',
  styleUrls: ['./referido.component.css']
})

export class ReferidoComponent implements OnInit {
  @ViewChild('programa') programa: ProgramaComponent;

  Nombre = new FormControl('', [Validators.required]);
  Egresado = new FormControl('', [Validators.required]);
  Correo = new FormControl('', [Validators.required, Validators.email]);
  Celular = new FormControl('', [Validators.required, Validators.minLength(13)]);
  Parentesco = new FormControl('', [Validators.required]);

  listaParentesco: string[] = ['Pareja/Cónyuge', 'Padre', 'Madre', 'Abuelo/a', 'Hijo/a', 'Otro'];

  varReferido: Referido;
  referidos = new Array<Referido>();

  constructor(private dialog:MatDialog,private router: Router, private alert: AlertService) {
    this.referidos = new Array<Referido>();
    this.limpiarDatos();
  }

  ngOnInit() {
  }

  limpiarDatos() {
    this.varReferido = new Referido();
    this.Nombre = new FormControl('', [Validators.required]);
    this.Parentesco = new FormControl('', [Validators.required]);
    this.Egresado = new FormControl('', [Validators.required]);
    this.Correo = new FormControl('', [Validators.required, Validators.email]);
    this.Celular = new FormControl('', [Validators.required, Validators.minLength(13)]);
  }
  validarDatos() {  
    var bandera: boolean = false;

    if (this.Nombre.value != '' && this.Egresado.value != '' && this.Correo.value != '' && this.Celular.value != ''
      && this.Parentesco.value != '') {
      bandera = true;
    }
    return bandera;
  }
  referidoDatos() {
    if (this.validarDatos()) {
      this.varReferido.nombres = this.Nombre.value;
      this.varReferido.parentesco = this.Parentesco.value;
      if (this.Egresado.value == 0) {
        this.varReferido.es_egresado = true;
        //this.varReferido.id_nivel_educativo = this.programa.NivelAcademico.value;
        this.varReferido.id_aut_programa = this.programa.Programa.value;
      }
      else if (this.Egresado.value == 1) {
        this.varReferido.es_egresado = false;
      }
      this.varReferido.correo = this.Correo.value;
      this.varReferido.telefono_movil = this.Celular.value;

      this.referidos.push(this.varReferido);

      if(this.referidos.length!=0){
        this.alert.showSuccesMessage('','Referencia agregada exitosamente.');
        this.limpiarDatos();
      }
    }
    else{
      this.alert.showErrorMessage('Error','Complete todos los datos.');
    }
  }
  cancelar(){
    this.dialog.open(CancelarDialogComponent).afterClosed().subscribe(
      resultado => { 
        if(resultado==0){
          this.limpiarDatos();
        }});
  }
}