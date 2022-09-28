import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  //get portfolios
  getPortfolios(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'portfolios');
  }
}
