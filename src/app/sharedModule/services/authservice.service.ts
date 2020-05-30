import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})  
export class AuthserviceService {

  constructor(private jwt:JwtHelperService) { }

  loginService(token?:string)
  {
    localStorage.setItem('authToken',token);
  }
  loginStatus()
  {
    if(!this.jwt.isTokenExpired(localStorage.getItem('authToken'))) return true;
    else return false;
  }
  decodeToken(keyToken)
  {
    const DTOKEN=this.jwt.decodeToken(localStorage.getItem(keyToken));
    return DTOKEN;
  }
  logoutService()
  {
    localStorage.removeItem('authToken');
  }
}
