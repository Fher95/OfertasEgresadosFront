import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { map } from 'rxjs/operators';
import { AuthModel } from '../../modelos/auth.model';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: string;
  userRol: string;

  constructor(
    private http: HttpClient,
    private config: Config
  ) { }

  login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.config.baseUrl + 'login', { email, password })
      .pipe(map<AuthModel, any>(response => {
        if (response.access_token) {
          const payload = jwt_decode(response.access_token);
          localStorage.setItem('token', response.access_token);
          this.userEmail = payload.email;
          this.userRol = payload.rol;
        }
      }));
  }

  get isLogin() {
    if (localStorage.getItem('token')) {
      const payload = jwt_decode(localStorage.getItem('token'));
      this.userEmail = payload.email;
      this.userRol = payload.rol;
      return true;
    }
    return false;
  }

  logout() {
    if (this.isLogin) {
      localStorage.removeItem('token');
      this.userEmail = this.userRol = null;
    }
  }
}
