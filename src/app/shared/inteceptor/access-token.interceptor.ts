import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(sessionStorage.getItem('user_email') && sessionStorage.getItem('jwtauth')){
            req = req.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('jwtauth')
                }
            });
        }
        return next.handle(req);
    }

}