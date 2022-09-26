import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  //watchlist
  getWatchlists(userId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'watchlists/users/' + userId);
  }

  addWatchlist(userId: number, name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.post<any>(this.url + `watchlists/users/${userId}`, null, { params });
  }

  deleteWatchlist(userId: number, name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.delete<any>(this.url + `watchlists/users/${userId}`, { params });
  }

  //watched stocks
  getWatchedStocks(watchlistId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'stocks/watchlists/' + watchlistId);
  }

  addWatchedStock(watchlistId: string, stockId: number): Observable<any> {
    const params = new HttpParams().set('stockId', stockId);
    return this.http.post<any>(this.url + `stocks/watchlists/${watchlistId}/`, null, { params });
  }

  removeWatchedStock(watchlistId: string, stockId: number): Observable<any> {
    const params = new HttpParams().set('stockId', stockId);
    return this.http.delete<any>(this.url + `stocks/watchlists/${watchlistId}`, { params });
  }

}
