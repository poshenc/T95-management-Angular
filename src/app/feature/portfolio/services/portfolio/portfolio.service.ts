import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';

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

  //get single Portfolio Info
  getPortfolioInfo(portfolioId: number): Observable<any> {
    return this.http.get<any>(`${this.url}portfolios/${portfolioId}`);
  }

  //get Portfolio Positions for single portfolio
  getPortfolioPositions(portfolioId: number): Observable<PortfolioPositionElement[]> {
    return this.http.get<PortfolioPositionElement[]>(`${this.url}portfolios/${portfolioId}/positions`);
  }
}
