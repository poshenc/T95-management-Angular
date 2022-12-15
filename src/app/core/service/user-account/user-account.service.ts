import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}login/`, data, {
      responseType: 'json',
      observe: 'response'
    });
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.url}user/signup/`, data, {
      responseType: 'json',
      observe: 'response'
    });
  }

  findDuplicate(name: string): Observable<any> {
    return this.http.get(`${this.url}user/findDuplicate/${name}/`, {
      responseType: 'json',
      observe: 'response'
    });
  }
}
