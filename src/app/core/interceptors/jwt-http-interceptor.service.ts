import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { SessionsService } from './../service/sessions/sessions.service';

@Injectable({ providedIn: 'root' })
export class JwtHttpInterceptorService {

  private domain: string;

  constructor(private sessionsService: SessionsService) {
    this.domain = environment.domain;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //ignore login request
    if (request.url.indexOf('/login/') != -1 || request.url.indexOf('/user/findDuplicate/') != -1 || request.url.indexOf('/user/signup/') != -1 || request.url.indexOf('assets/config/config.json') != -1) {
      return next.handle(request);
    }

    // add auth header with jwt if account is logged in and request is to the api url
    const jwtToken = this.sessionsService.getJWT();
    const isLoggedIn = (jwtToken !== null);
    const isApiUrl = request.url.startsWith(this.domain);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        }
      });
    }

    return next.handle(request);
  }
}
