import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'
import { isNullOrUndefined} from 'util'
import { authInterface } from 'src/app/shared/modelos/authInterface'

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  loginUser ( email: string, password: string): Observable<any>{
    const url_api = 'htttp://localhost:8081/api/login'
    return this.http.post<authInterface>(url_api,{email,password},{headers: this.headers})
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
      const url_api = 'htttp://localhost:8081/api/login'
      const params ='json={"email": "' + user.email + '", "password": "'+ user.password + '","getToken":"true"}';
      return this.http.post(url_api,params,{headers: this.headers})
      .pipe(map(data => data));
    }
    
  

  logout(){
    
  }

}
