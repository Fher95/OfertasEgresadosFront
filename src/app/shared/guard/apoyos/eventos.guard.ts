import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import { AlertService } from '../../servicios/common/alert.service';
import { ServiciosService } from '../../servicios/auth/servicios.service';
import { ApoyoGuard } from './apoyos.guard';

@Injectable({ providedIn: 'root' })
export class EventosGuard extends ApoyoGuard {
  constructor(
    protected auth: AuthService,
    protected router: Router,
    protected alertService: AlertService,
    protected servicioService: ServiciosService
  ) {
    super(auth, router, alertService, servicioService);
  }

  puedeAccederAlServicio(services: string[]): boolean {
    return services.map(s => s.toUpperCase()).includes('EVENTOS');
  }
}
