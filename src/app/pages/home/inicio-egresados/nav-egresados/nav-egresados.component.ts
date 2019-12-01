import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-egresados',
  templateUrl: './nav-egresados.component.html',
  styleUrls: ['./nav-egresados.component.css']
})
export class NavEgresadosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  completarReg(){
    this.router.navigate(['egresados/completarRegistro']);
  }
  perfil(){
    this.router.navigate(['egresados/perfil']);
  }
  ofertasLab(){
    this.router.navigate(['home']);
  }
}
