import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public domain: string;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  fetchUserInfo(): Observable<any> {
    return this.http.get(`${this.domain}user/`);
  }

  updateUserInfo(data: any): Observable<any> {
    return this.http.put(`${this.domain}user/`, data, {
      responseType: 'json',
      observe: 'response'
    });
  }
}
