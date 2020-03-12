import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AlertService } from '../servicios/common/alert.service';
import { AuthService } from '../servicios/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminApoyoGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private alert: AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.auth.isLogin &&
      (this.auth.userRol.toUpperCase() == 'APOYO' ||
        this.auth.userRol.toUpperCase() == 'ADMINISTRADOR')
    ) {
      return true;
    }
    this.alert
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
