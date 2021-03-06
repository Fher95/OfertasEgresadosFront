import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'
import { isNullOrUndefined} from 'util'
import { authInterface } from 'src/app/shared/modelos/authInterface'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  loginUser ( email: string, password: string): Observable<any>{
    const url_api = `${this.baseUrl}login`
    let params = 'json={"email": "'+ email + '", "password": "'+ password+'"}';
    return this.http.post<authInterface>(url_api, params, {headers: this.headers})
    .pipe(map(data => data));
  }
  setUser(user : authInterface ){
    let userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }

  setToken(token){
    localStorage.setItem("accessToken", token);
  }

  getToken(){
    return localStorage.getItem("accessToken");
  }

  getCurrentUser():authInterface
  {
    let userString = localStorage.getItem("currentUser");
    if(!isNullOrUndefined(userString)){
      let user: authInterface = JSON.parse(userString);
      return user;
    }else {
      return null;
    }
  }
  getDatos(): Observable<any>{
      let user = this.getCurrentUser()
      const url_api = `${this.baseUrl}login`;
      const params ='json={"email": "' + user.email + '", "password": "'+ user.password + '","getToken":"true"}';
      return this.http.post(url_api,params,{headers: this.headers})
      .pipe(map(data => data));
    }



  logout(){

  }

}

