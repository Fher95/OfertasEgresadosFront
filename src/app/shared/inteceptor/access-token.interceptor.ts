import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token')) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
        return next.handle(req);
    }
}
