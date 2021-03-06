import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service'
import { Router } from '@angular/router'

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email:String=""
  public password:String=""

  constructor(private auth_service:AuthorizationService,private _router:Router) { }

  ngOnInit(): void {
  }

  public loginUser() {
    console.log("hello entered");
      let user_obj:any={};
      user_obj.email=this.email;
      user_obj.password = this.password;
      console.log(user_obj)
      this.auth_service.get_userdetails(user_obj).subscribe((response:any)=>{
        localStorage.setItem('token', response.token)
        this._router.navigate(['/'])
      });

    }

}
