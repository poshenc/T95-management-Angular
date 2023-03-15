import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  public domain: string;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.domain}login/`, data, {
      responseType: 'json',
      observe: 'response'
    });
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.domain}user/signup/`, data, {
      responseType: 'json',
      observe: 'response'
    });
  }

  findDuplicate(name: string): Observable<any> {
    return this.http.get(`${this.domain}user/findDuplicate/${name}/`, {
      responseType: 'json',
      observe: 'response'
    });
  }
}
