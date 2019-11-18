import { Component, OnInit } from '@angular/core';
import { authInterface } from 'src/app/shared/modelos/authInterface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';

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
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onLogin() {
    this.router.navigate(['empresa/1/datosEmpresa']);
    /*console.log(this.user.email)
    console.log(this.user.password)

    return this.authService.loginUser(this.user.email, this.user.password)
    .subscribe(data => {
      console.log(data)
      this.authService.setUser(data.user)
      this.authService.setToken(data)
      this.router.navigate(['/datosEmpresa'])
    }),
    error => console.log(error)*/
  }
  onRegistroEmpresa() {
    this.router.navigate(['registroEmpresa']);
  }
  onEgresados() {
    this.router.navigate(['/egresados']);
  }

  get isLogin() {
    return this.auth.isLogin;
  }

  get isAdmin() {
    return this.auth.userRol ? this.auth.userRol.toUpperCase() === 'ADMIN' : false;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
