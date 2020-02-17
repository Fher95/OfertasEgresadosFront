import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';
import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { EmpresaService } from "../servicios/empresa/empresa.service";

@Injectable({
  providedIn: 'root'
})
export class EmpresaGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService
  ) { }

  canActivate(): boolean {
    if (!this.auth.isLogin || this.auth.userRol.toUpperCase() !== 'EMPRESA') {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
    /*let respuesta: boolean;
    let retorno: boolean = false;
    this.empresaService.validarEmpresaActiva(this.auth.userEmail)
      .subscribe((res: any) => {
        console.log("Respuesta: ", res.activo);
        respuesta = res.activo;
        console.log("Estado: ", respuesta);
        if (respuesta == true) {
          retorno = true;
        } else {
          this.alertService.showInfoMessage('Acceso denegado', 'Su cuenta se encuentra inactiva o está en proceso de verificación. Gracias')
            .then(() => {
              this.auth.logout();
              this.router.navigateByUrl('/home');
              retorno = false;
            });
          //this.router.navigateByUrl('/login');
          //return false;
        }
      },
      () => {
        respuesta = null;
        console.log("Respuesta: ", respuesta)
      });
      return retorno;*/
  }

}
