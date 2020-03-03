import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';

@Component({
  selector: 'app-nav-egresados',
  templateUrl: './nav-egresados.component.html',
  styleUrls: ['./nav-egresados.component.css']
})
export class NavEgresadosComponent implements OnInit {

  constructor(private router: Router,private auth: AuthService) { }

  ngOnInit() {
  }
  completarReg(){
    this.router.navigate(['egresados/completarRegistro']);
  }
  perfil(){
    this.router.navigate(['egresados/verPerfil']);
  }
  ofertasLab(){
    this.router.navigate(['home']);
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
  get isLogin() {
    return this.auth.isLogin;
  }
}
