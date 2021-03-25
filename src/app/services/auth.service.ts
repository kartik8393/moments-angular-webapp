import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  loginUser(url,userdetail){
    return this.http.post(environment.development_url+url,userdetail)
  }

  registerUser(url,userdetail){
    return this.http.post(environment.development_url+url,userdetail)
  }

  loggedIn(){
    return !!localStorage.getItem('auth-token')
  }

  doLogout(){
    console.log("in logout service")
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
