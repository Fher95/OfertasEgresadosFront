import { Component, OnInit } from '@angular/core';
import { authInterface } from 'src/app/shared/modelos/authInterface';
import { AuthServicesService } from 'src/app/shared/servicios/authServices/auth-services.service';
import { Router } from '@angular/router';

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
  constructor(private authService : AuthServicesService, private router: Router) { }

  ngOnInit() {
  }

  
  onLogin(){
    console.log(this.user.email)
    console.log(this.user.password)

    return this.authService.loginUser(this.user.email, this.user.password)
    .subscribe(data => {
      console.log(data)
      this.authService.setUser(data.user)
      this.authService.setToken(data)
      this.router.navigate(['/datosEmpresa'])
    }),
    error => console.log(error)
  }
  onRegistroEmpresa(){
    this.router.navigate(['registroEmpresa']);
  }z
}
