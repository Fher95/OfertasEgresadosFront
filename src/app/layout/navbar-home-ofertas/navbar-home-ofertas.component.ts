import { Component, OnInit } from '@angular/core';
import { authInterface } from 'src/app/shared/modelos/authInterface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { AuthServicesService } from 'src/app/shared/servicios/authServices/auth-services.service';

@Component({
  selector: 'app-navbar-home-ofertas',
  templateUrl: './navbar-home-ofertas.component.html',
  styleUrls: ['./navbar-home-ofertas.component.css']
})
export class NavbarHomeOfertasComponent implements OnInit {


  private user: authInterface = {
    email: "",
    password: ""
  }
  constructor(private auth: AuthService, private router: Router, private authService: AuthServicesService) { }

  ngOnInit() {
    console.log(this.auth.userRol);
    console.log(this.authService.getCurrentUser());
  }

  onRegistroEmpresa() {
    this.router.navigate(['registroEmpresa']);
  }
  onEgresados() {
    this.router.navigate(['/egresados']);
  }
  onOfertas() {
    this.router.navigate(['empresa/1/datosEmpresa'])
  }

  get isLogin() {
    return this.auth.isLogin;
  }

  get isAdmin() {
    return this.auth.userRol ? this.auth.userRol.toUpperCase() === 'ADMIN' : false;
  }

  get isEmpresa() {
    return this.auth.userRol ? this.auth.userRol.toUpperCase() === 'EMPRESA' : false;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
