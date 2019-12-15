import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  value = 'Me falta el modelo para conectar con el back, que les rinda! :D';
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  btnAtras(){
    this.router.navigate(['home']);
  }
  actualizarInformacion(){

  }

}
