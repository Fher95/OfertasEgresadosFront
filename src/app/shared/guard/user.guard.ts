import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth/auth.service';

@Injectable()
export class UserGuard {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLogin || localStorage.getItem('user_email').toUpperCase() === 'USER') {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
