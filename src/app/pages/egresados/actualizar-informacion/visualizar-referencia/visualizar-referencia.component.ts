import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Referido } from 'src/app/shared/modelos/referido';
import { DialogData } from 'src/app/pages/empresa/editar-empresa/editar-empresa.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-visualizar-referencia',
  templateUrl: './visualizar-referencia.component.html',
  styleUrls: ['./visualizar-referencia.component.css']
})
export class VisualizarReferenciaComponent implements OnInit {
  listaParentesco: string[] = ['Pareja/Cónyuge', 'Padre', 'Madre', 'Abuelo/a', 'Hijo/a', 'Otro'];

  referido: Referido;
  nombre = new FormControl('', [Validators.required]);
  parentesco = new FormControl('', [Validators.required]);
  correo = new FormControl('', [Validators.required]);
  celular = new FormControl('', [Validators.required]);
  egresado = new FormControl('', [Validators.required]);

  value:string="Sirve";
  pruebas:string[]=['a','b','c'];


  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) data) {
    this.referido= data;  
  }

  ngOnInit() {
  }
  
  actualizarReferencia(){
    this.referido.nombres=this.nombre.value;
    this.referido.parentesco=this.parentesco.value;
    this.referido.correo=this.correo.value;
    this.referido.telefono_movil=this.celular.value;
    if(this.egresado.value==0){
      this.referido.es_egresado=true;
    }
    else if(this.egresado.value==1){
      this.referido.es_egresado=false;
    }
    return this.referido;
  }
}
