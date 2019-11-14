import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';

@Injectable()
export class AuthGuard{

    constructor(
        private auth: AuthService,
        private router: Router
    ){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(!this.auth.isLogin) {
            this.router.navigateByUrl('/home');
            return false;
        }
        return true;
    }

}