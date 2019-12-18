import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilEgresado } from 'src/app/shared/modelos/perfilEgresado';
import { MatTableDataSource } from '@angular/material';
import { Grado } from 'src/app/shared/modelos/grado';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  value = 'Me falta el modelo para conectar con el back, que les rinda! :D';

  perfil = new PerfilEgresado();

  //Tabla grados
  columnasGrado : string[] ;//= //['fecha_graduacion','nombre','mencion_honor', 'estado'];//,'acciones'];
  dataGrados: MatTableDataSource<any>;

  //Tabla referidos
  columnasReferido : string[];// = ['fecha_graduacion','nombre','mencion_honor', 'estado'];//,'acciones'];
  dataReferidos: MatTableDataSource<any>;
  
  constructor(private router: Router) {
    
   }

  ngOnInit() {
  }

  obtenerDatosEgresado(){
    
  }
  obtenerDatosGrados(){
    this.dataGrados = new MatTableDataSource<any>(this.perfil.grados);
  }
  obtenerDatosReferidos(){
    
  }
  visualizar(grado : Grado){

  }
  btnAtras(){
    this.router.navigate(['egresados']);
  }
  btnActualizar(){
    this.router.navigate(['egresados/actualizar']);
  }

}
