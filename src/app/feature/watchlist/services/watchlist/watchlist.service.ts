import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  public domain: string;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  //watchlist
  getWatchlists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.domain}watchlists`);
  }

  addWatchlist(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.post<any>(this.domain + 'watchlists', null, { params });
  }

  deleteWatchlist(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.delete<any>(this.domain + 'watchlists', { params });
  }

  //watched stocks
  getWatchedStocks(watchlistId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.domain}watchlists/${watchlistId}/stocks`);
  }

  addWatchedStock(watchlistId: string, stockId: number): Observable<any> {
    const params = new HttpParams().set('stockId', stockId);
    return this.http.post<any>(`${this.domain}watchlists/${watchlistId}/stocks`, null, { params });
  }

  removeWatchedStock(watchlistId: string, stockId: number): Observable<any> {
    const params = new HttpParams().set('stockId', stockId);
    return this.http.delete<any>(`${this.domain}watchlists/${watchlistId}/stocks`, { params });
  }

}
