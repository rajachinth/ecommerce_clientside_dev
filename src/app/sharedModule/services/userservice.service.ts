import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class  UserService 
{
  constructor(private http:HttpClient) { }

  userSignupService(signupData)
  {
    console.log(signupData);
    return this.http.post('http://localhost:3000/authentication/signup',signupData,{responseType:'text'});
  }
  userPostService(loginData)
  {
    return this.http.post('http://localhost:3000/authentication/login',loginData,{responseType:'text'}); //XHR or XMLHttpRequest (Extensibe )
  }
}
