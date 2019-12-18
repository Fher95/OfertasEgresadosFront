import { Component, OnInit } from '@angular/core';
import { authInterface } from 'src/app/shared/modelos/authInterface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth/auth.service';
import { AuthServicesService } from 'src/app/shared/servicios/authServices/auth-services.service';
import { EmpresaService } from 'src/app/shared/servicios/empresa/empresa.service';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';

@Component({
  selector: 'app-navbar-home-ofertas',
  templateUrl: './navbar-home-ofertas.component.html',
  styleUrls: ['./navbar-home-ofertas.component.css']
})
export class NavbarHomeOfertasComponent implements OnInit {

  id: string;

  private user: authInterface = {
    email: "",
    password: ""
  }
  constructor(
    private auth: AuthService,
    private router: Router,
    private authService: AuthServicesService,
    private empService: EmpresaService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    console.log("Rol: ", this.auth.userRol);
    console.log("Email: ", this.auth.userEmail);
    this.asignarID();
  }

  onRegistroEmpresa() {
    this.router.navigate(['registroEmpresa']);
  }
  onEgresados() {
    this.router.navigate(['/egresados']);
  }
  
  onPanelAdmin(){
    this.router.navigate(['/admin'])
  }

  asignarID() {
    if (this.isLogin) {
      if (this.isEmpresa && (this.auth.userEmail != undefined)) {
        this.empService.obtenerID(this.auth.userEmail).subscribe(resultado => {
          console.log("id: ", resultado.data.id_aut_empresa);
          this.id = resultado.data.id_aut_empresa;
        },
        error => {
          this.alert.showErrorMessage("Ha ocurrido un error", "Por favor recarga la página o intenta más tarde");
          console.log("Error al obtener el id de la empresa: ", JSON.stringify(error));
        });
      }
      /* TODO: obtener el id de Administrador */
      /* TODO: obtener el id de Egresado */
    }
  }

  get isLogin() {
    return this.auth.isLogin;
  }

  get isAdmin() {
    return this.auth.userRol ? this.auth.userRol.toUpperCase() === 'ADMINISTRADOR' : false;
  }

  get isEmpresa() {
    return this.auth.userRol ? this.auth.userRol.toUpperCase() === 'EMPRESA' : false;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
