import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.auth.isLogin || this.auth.userRol.toUpperCase() !== 'EMPRESA') {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
