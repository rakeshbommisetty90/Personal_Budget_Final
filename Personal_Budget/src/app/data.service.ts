import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { local } from 'd3';


@Injectable({
  providedIn: 'root'
})
export class DataService {

   DataObservable: Observable<any>;


  isUserLoggedIn = new Subject<boolean>();


  constructor(private http: HttpClient, public router: Router) { }

    getBudgetData(): Observable<any> {
      if (this.DataObservable) {
        return this.DataObservable;
      } else {
        const token = localStorage.getItem('jwt');
        const headers = {'content-type': 'application/json', Authorization : `Bearer ${token}`};
        this.DataObservable = this.http.get('http://localhost:3000/budget').pipe(shareReplay());
        return this.DataObservable;
      }
    }



    // addBudgetdata(data: BudgetSchema){
    //   const headers = {'content-type': 'application/json'};
    //   const body = JSON.stringify(data);
    //   console.log(body)
    //   return this.http.post('http://localhost:3000/budget', body,{'headers':headers});
    // }

    // invaliduser(){
    //   this.toastr.error('User does not exist. Please proceed to signup page', 'Error');
    // }


    // public logout(): void {
    //   localStorage.removeItem('accessToken');
    //   localStorage.removeItem('refreshToken');
    //   this.isUserLoggedIn.next(false);
    //   this.router.navigate(['/login']);
    // }

    // public getLoginStatus(): Observable<boolean> {
    //   return this.isUserLoggedIn;
    // }

    // verifyTokenPresence(){
    //   return !!localStorage.getItem('token');
    // }

    // getData(): any {
    //   return this.http.get('http://localhost:3000/budget');
    // }

   }
