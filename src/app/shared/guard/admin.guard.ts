import { AlertService } from 'src/app/shared/servicios/common/alert.service';
import { AuthService } from './../servicios/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
        private alertService: AlertService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.auth.isLogin || this.auth.userRol.toUpperCase() !== 'ADMINISTRADOR') {
            this.alertService.showInfoMessage('Acceso denegado', 'No cuenta con los permisos suficientes para acceder a esta página')
                .then(() => {
                    this.router.navigateByUrl('/home');
                    return false;
                });
        }
        return true;
    }
}