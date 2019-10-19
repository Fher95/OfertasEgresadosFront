import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/shared/servicios/authServices/auth-services.service';
import { authInterface } from 'src/app/shared/modelos/authInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-home-ofertas',
  templateUrl: './home-ofertas.component.html',
  styleUrls: ['./home-ofertas.component.css']
})
export class HomeOfertasComponent implements OnInit {

  constructor(private authService : AuthServicesService) { }
  private user: authInterface = {
    email: "",
    password: ""
  }
  ngOnInit() {
  }

  onLogin(){
    console.log(this.user.email)
    return this.authService.loginUser(this.user.email, this.user.password)
    .subscribe(data => {
      console.log(data)
    }),
    error => console.log(error)
  }

}
 
