
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthorizationService } from './authorization.service';

@Injectable()
export class TokenService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let authservice = this.injector.get(AuthorizationService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

}
