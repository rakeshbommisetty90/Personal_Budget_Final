import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { AuthorizationService } from './authorization.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice:AuthorizationService,
    private _router:Router){ }
  canActivate():boolean{

    if (this.authservice.loggedIn()){
      return true
    }
    else{
      this._router.navigate(['/login'])
      return false
    }

  }

}

