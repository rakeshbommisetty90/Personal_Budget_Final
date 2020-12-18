import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router'

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public email:string="";
  public password:string="";
  public confirm_password:string = "";

  constructor(private auth_service:AuthorizationService,private _router:Router) {  }

  ngOnInit(): void {
  }

  public registerUser() {
    console.log("hello entered");


    if(this.password!=this.confirm_password){
      console.log("not valid password")

    }
    else{
      let user:any={};
      user.email=this.email;
      user.password = this.password;
      console.log(user)
      this.auth_service.registration(user).subscribe( res => {
        console.log("entered")
        localStorage.setItem('token', res.token)
        console.log('entered')
        this._router.navigate(['/'])
      },
      err => console.log(err));
    }

  }


}
