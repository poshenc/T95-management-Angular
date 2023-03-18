import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  public domain: string;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  getStockBySymbol(symbol: string): Observable<any> {
    return this.http.get<any>(this.domain + 'stocks/' + symbol);
  }

  getStocksList(): Observable<any[]> {
    return this.http.get<any[]>(this.domain + 'stocks');
  }
}
