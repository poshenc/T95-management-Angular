import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioValueElement } from '../../portfolio/models/portfolio-value.model';
import { PortfolioPositionElement } from '../models/portfolio-position.model';
import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public domain: string;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  //get Portfolio Positions
  getPortfolioPositions(portfolioId: number): Observable<PortfolioPositionElement[]> {
    return this.http.get<PortfolioPositionElement[]>(`${this.domain}portfolios/${portfolioId}/positions`);
  }

  //get all portfolios by user
  getPortfoliosByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.domain}portfolios/`);
  }

  //get single portfolio value by date and by user
  getPortfolioValueByPortfolioId(portfolioId: any, date: string): Observable<PortfolioValueElement> {
    const params = new HttpParams().set('portfolioId', portfolioId).set('date', date);
    return this.http.get<PortfolioValueElement>(`${this.domain}portfolioHistory/portfolioByDate`, { params });
  }

  //get all portfolios value by date and by user
  getAllPortfoliosValueByDate(date: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<PortfolioValueElement[]>(`${this.domain}portfolioHistory/allPortfoliosByDate`, { params });
  }

  //get all portfolios values by date range and by user
  getAllPortfoliosValueByDateRange(dateStart: string, dateEnd: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('dateStart', dateStart).set('dateEnd', dateEnd);
    return this.http.get<PortfolioValueElement[]>(`${this.domain}portfolioHistory/allPortfoliosByDateBetween`, { params });
  }
}
