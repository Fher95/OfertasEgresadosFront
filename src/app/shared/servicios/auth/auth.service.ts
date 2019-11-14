import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { map } from 'rxjs/operators';
import { AuthModel } from '../../modelos/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private config: Config
  ) { }

  login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.config.baseUrl + 'login', { email: email, password: password })
      .pipe(map<AuthModel, any>(response => {
        if (response.access_token) {
          let jwtauthstring: string = 'Barear ' + response.access_token;
          localStorage.setItem('user_rol', response.user_rol);
          localStorage.setItem('jwtauth', jwtauthstring);
          localStorage.setItem('user_email', response.user_email);
        }
      }));
  }

  get isLogin() {
    return localStorage.getItem('user_rol') != undefined;
  }

  logout() {
    if (this.isLogin) {
      localStorage.removeItem('user_rol');
      localStorage.removeItem('user_email');
      localStorage.removeItem('jwtauth');
    }
  }
}
