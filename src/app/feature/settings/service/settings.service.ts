import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.url}user/`, data, {
      responseType: 'json',
      observe: 'response'
    });
  }
}
