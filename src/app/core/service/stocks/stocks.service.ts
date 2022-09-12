import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  public url: string = 'http://localhost:8086/api/stocks/';

  constructor(private http: HttpClient) { }

  getStockById(stockId: number): Observable<any> {
    return this.http.get<any>(this.url + stockId);
  }

  getStocksList(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
