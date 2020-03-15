import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = req.headers.set(
      'Content-Security-Policy',
      "default-src 'self' *.herokuapp.com"
    );
    console.log('Adding security policy');
    const request = req.clone({ headers });
    return next.handle(request);
  }
}
