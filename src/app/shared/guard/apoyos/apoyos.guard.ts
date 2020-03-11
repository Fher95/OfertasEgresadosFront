import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AlertService } from '../../servicios/common/alert.service';
import { AuthService } from '../../servicios/auth/auth.service';
import { ServiciosService } from '../../servicios/auth/servicios.service';

export abstract class ApoyoGuard implements CanActivate {
  constructor(
    protected auth: AuthService,
    protected router: Router,
    protected alertService: AlertService,
    protected servicioService: ServiciosService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLogin && this.auth.userRol.toUpperCase() === 'APOYO') {
      let services: string[] = [];
      this.servicioService
        .getServicioApoyoBy(this.auth.userEmail)
        .subscribe(servs => {
          services = servs;
          if (this.puedeAccederAlServicio(services)) {
            this.alertService
              .showInfoMessage(
                'Acceso denegado',
                'No cuenta con los permisos suficientes para acceder a esta página'
              )
              .then(() => {
                this.router.navigateByUrl('/home');
                return false;
              });
          }
        });
    }
    return true;
  }

  abstract puedeAccederAlServicio(services: string[]): boolean;
}
