import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from 'src/app/shared/servicios/common/catalogos.service';
import { DiscapacidadInterface } from 'src/app/shared/modelos/discapacidadInterface';
import { Router } from '@angular/router';
import { ReferidoComponent } from '../referido/referido.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Referido } from 'src/app/shared/modelos/referido';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { VisualizarReferenciaComponent } from './visualizar-referencia/visualizar-referencia.component';

@Component({
  selector: 'app-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.css']
})
export class ActualizarInformacionComponent implements OnInit {
  @ViewChild('referido') referido : ReferidoComponent;

  discapacidades:DiscapacidadInterface[];
  estadosCiviles: string[] = ['Soltero(a)', 'Casado(a)', 'Viudo(a)', 'Union Libre', 'Separado(a)', 'Comprometido(a)', 'Divorciado(a)'];
  
  //Tabla referidos
  columnas : string[] = ['nombres','parentesco','telefono_movil', 'acciones'];
  dataReferidos: MatTableDataSource<any>;
  referidos: any[];
  
  
  pruebas: string[] = ['a','b','c','d','Otra(s)'];
  value: string='Holi';

  constructor(private dialog:MatDialog,private router:Router,private catalogoService:CatalogosService,private alert: AlertService) {
    
   }

  ngOnInit() {
    this.obtenerDiscapacidades();
  }

  obtenerDiscapacidades(){
    this.catalogoService.getDiscapacidad();
  }

  //Datos referencias personales
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
  verificarCantReferidos(){
    var bandera:boolean = false;
    if(!this.referidos) {
      this.referidos = [];
    }
    if(this.referidos.length>=2){
      bandera=true;
    }
    return bandera;
  }
  validarSigReferido(){
    if(!this.verificarCantReferidos()){
      this.alert.showInfoMessage('','Para continuar a la siguiente sección, debe tener al menos dos referencias personales.');
    }
  }
  visualizar(referido: Referido){
    this.dialog.open(VisualizarReferenciaComponent,{data: referido}).afterClosed().subscribe(
      respuesta => {
        if(respuesta!=null){
          console.log('Entro');
          console.log(respuesta);
        }
      }
    );
  }

  irPerfil(){
    this.router.navigate(['egresados/perfil']);
  }

}
