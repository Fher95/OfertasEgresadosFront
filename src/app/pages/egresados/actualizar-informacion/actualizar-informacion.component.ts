import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';
import { Router } from '@angular/router';
import { ReferidoComponent } from '../referido/referido.component';
import { MatTableDataSource } from '@angular/material';
import { Referido } from 'src/app/shared/modelos/referido';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.css']
})
export class ActualizarInformacionComponent implements OnInit {
  @ViewChild('referido') referido : ReferidoComponent;

  //Tabla referidos
  columnas : string[] = ['nombres','parentesco','telefono_movil', 'acciones'];
  dataReferidos: MatTableDataSource<any>;
  referidos: any[];

  discapacidades:DiscapacidadInterface[];

  estadosCiviles: string[] = ['Soltero(a)', 'Casado(a)', 'Viudo(a)', 'Union Libre', 'Separado(a)', 'Comprometido(a)', 'Divorciado(a)'];
  
  pruebas: string[] = ['a','b','c','d','Otra(s)'];
  value: string='Holi';


  constructor(private router:Router,private catalogoService:CatalogosService,private alert: AlertService) {
    
   }

  ngOnInit() {
    this.obtenerDiscapacidades();
  }

  obtenerDiscapacidades(){
    this.catalogoService.getDiscapacidad();
  }

  //Añadir datos referidos
  addToList(referido: Referido) {
    var bandera:boolean=true;
    console.log(referido);
    if(!this.referidos) {
      this.referidos = [];
    }
    this.referidos.forEach(element => {
      if(element.correo==referido.correo){
        bandera=false;
      }
    });
    if(bandera){
      this.referidos.push(referido);
      if(this.referidos.length!=0){
        this.alert.showSuccesMessage('','Referencia agregada exitosamente.');
        this.referido.limpiarDatos();
      }
      this.dataReferidos = new MatTableDataSource<any>(this.referidos);
    }
    else{
      this.alert.showErrorMessage('','La referencia personal ya existe.');
    }
  }
  eliminarReferido(referido: Referido){
    console.log('Referido a eliminar: ' + referido);
    const index = this.referidos.indexOf(referido);
    if(index >= 0) {
      this.referidos.splice(index, 1);
      this.dataReferidos = new MatTableDataSource<any>(this.referidos);
      console.log('Referido eliminado');
    }
  }
  visualizar(referido: Referido){
  }

  irPerfil(){
    this.router.navigate(['egresados/perfil']);
  }

}
