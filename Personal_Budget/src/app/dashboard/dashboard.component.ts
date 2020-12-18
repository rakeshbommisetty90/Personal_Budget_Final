import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   public specialEvents = []

  constructor(private authservice:AuthorizationService,private _router:Router) { }

  ngOnInit(){
    this.authservice.dashboard().subscribe(
      res=>this.specialEvents=res,
      err => {
        if (err instanceof HttpErrorResponse){
          if (err.status == 401){
            this._router.navigate['/login']
          }
        }

      }
  )

  }

}
