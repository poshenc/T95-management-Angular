import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioPositionElement } from '../models/portfolio-position.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  //get Portfolio Positions
  getPortfolioPositions(portfolioId: number): Observable<PortfolioPositionElement[]> {
    return this.http.get<PortfolioPositionElement[]>(`${this.url}portfolios/${portfolioId}/positions`);
  }

  //get all portfolios by user
  getPortfoliosByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}portfolios/`);
  }
}
