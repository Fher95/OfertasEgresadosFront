import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilEgresado } from 'src/app/shared/modelos/perfilEgresado';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  value = 'Me falta el modelo para conectar con el back, que les rinda! :D';

  perfil : PerfilEgresado;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  obtenerDatosEgresado(){
    
  }

  btnActualizar(){
    this.router.navigate(['egresados/actualizar']);

  }

}
