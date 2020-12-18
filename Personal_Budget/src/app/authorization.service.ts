import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public login_url:string= "http://localhost:3000/login";
  public register_url:string= "http://localhost:3000/registration";
  public dashboard_url:string= "http://localhost:1234/dashboard";

  constructor(private httpobject:HttpClient,private _router:Router) { }


  public registration(user:any):Observable<any>{
    console.log("Registration service");
    return this.httpobject.post(this.register_url,user)
  }

  public get_userdetails(user:any):Observable<any>{
    console.log("Entered login service");
    return this.httpobject.post(this.login_url,user)
  }

  public dashboard(){
    return this.httpobject.get<any>(this.dashboard_url)
  }

  public loggedIn()
  {
    return !!localStorage.getItem('token')
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  public logout() {
    localStorage.removeItem('token')
    this._router.navigate([''])
  }
}
