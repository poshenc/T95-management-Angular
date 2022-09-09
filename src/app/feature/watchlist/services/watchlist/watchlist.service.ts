import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  getWatchlists(userId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'watchlist/' + userId);
  }

  getWatchedStocks(watchlistId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'watchedStocks/' + watchlistId);
  }

  addWatchedStock(watchlistId: string, stockId: number): Observable<any> {
    const params = new HttpParams()
      .set('stockId', stockId);
    return this.http.post<any>(this.url + `watchedStocks/${watchlistId}/`, params);
  }

  removeWatchedStock(watchlistId: string, stockId: number): Observable<any> {
    return this.http.delete<any>(this.url + `watchedStocks/${watchlistId}?stockId=${stockId}`);
  }

}
