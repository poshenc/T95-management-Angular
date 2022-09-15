import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionsService } from './../service/sessions/sessions.service';

@Injectable()
export class JwtHttpInterceptorService {

  constructor(private sessionsService: SessionsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //ignore login request
    if(request.url.indexOf('/login/')!=-1){
      return next.handle(request);
    }

    // add auth header with jwt if account is logged in and request is to the api url
    const jwtToken = this.sessionsService.getJWT();
    const isLoggedIn = (jwtToken !== null);
    const isApiUrl = request.url.startsWith('http://localhost:8086/api/');

    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
              'Content-Type':'application/json',
              'Authorization': jwtToken
             }
        });
        console.log('interceptor: ', request);

    }

    return next.handle(request);
  }
}
