import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';
import { ServiciosService } from '../servicios/auth/servicios.service';
import { AlertService } from '../servicios/common/alert.service';

@Injectable({ providedIn: 'root' })
export class ApoyosGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private servicioService: ServiciosService,
    private alertService: AlertService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.auth.isLogin &&
      (this.auth.userRol.toUpperCase() == 'APOYO' ||
        this.auth.userRol.toUpperCase() == 'ADMINISTRADOR')
    ) {
      const servicio = route.data['servicios'] as string;
      const serviciosApoyo = await this.servicioService
        .getServicioApoyoBy(this.auth.userEmail)
        .toPromise();
      if (serviciosApoyo.map(s => s.toLowerCase()).includes(servicio)) {
        return true;
      }
    }
    this.alertService
      .showInfoMessage(
        'Acceso denegado',
        'No cuenta con los permisos suficientes para acceder a esta página'
      )
      .then(() => {
        this.router.navigateByUrl('/home');
      });
      return false;
  }
}
